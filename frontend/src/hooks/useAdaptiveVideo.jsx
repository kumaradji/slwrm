// hooks/useAdaptiveVideo.js
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";

const useAdaptiveVideo = (videoSources, options = {}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Определение характеристик устройства
  const getDeviceInfo = () => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && !isMobile;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    let connectionSpeed = 'unknown';
    let recommendedQuality = '720p';

    if (connection) {
      const effectiveType = connection.effectiveType;
      connectionSpeed = effectiveType;

      switch(effectiveType) {
        case 'slow-2g':
        case '2g':
          recommendedQuality = '360p';
          break;
        case '3g':
          recommendedQuality = isMobile ? '360p' : '480p';
          break;
        case '4g':
        default:
          recommendedQuality = isMobile ? '480p' : '720p';
          break;
      }
    } else {
      recommendedQuality = isMobile ? '480p' : '720p';
    }

    return {
      isMobile,
      isTablet,
      connectionSpeed,
      recommendedQuality,
      deviceType: isMobile ? 'Мобильное устройство' : (isTablet ? 'Планшет' : 'Десктоп'),
      saveData: navigator.connection?.saveData || false
    };
  };

  useEffect(() => {
    const device = getDeviceInfo();
    setDeviceInfo(device);

    if (videoRef.current && !playerRef.current && videoSources.length > 0) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add('vjs-default-skin');
      videoElement.setAttribute('controls', '');

      // Настройки preload в зависимости от соединения и экономии трафика
      const preloadSetting = device.saveData || device.connectionSpeed.includes('2g')
        ? 'none'
        : options.preload || 'metadata';
      videoElement.setAttribute('preload', preloadSetting);

      videoElement.setAttribute('data-setup', '{}');
      videoElement.style.width = '100%';
      videoElement.style.height = 'auto';

      // Добавление источников видео
      videoSources.forEach(source => {
        const sourceElement = document.createElement('source');
        sourceElement.src = source.src;
        sourceElement.type = source.type;
        if (source.label) sourceElement.setAttribute('label', source.label);
        videoElement.appendChild(sourceElement);
      });

      // Fallback сообщение
      const fallbackP = document.createElement('p');
      fallbackP.className = 'vjs-no-js';
      fallbackP.innerHTML = `
        Для просмотра видео необходимо включить JavaScript или 
        <a href="${videoSources[0]?.src}" target="_blank">скачать видео</a>.
      `;
      videoElement.appendChild(fallbackP);

      videoRef.current.appendChild(videoElement);

      // Создание Video.js плеера
      const playerOptions = {
        responsive: true,
        fluid: true,
        playbackRates: options.playbackRates || [0.75, 1, 1.25, 1.5],
        controls: true,
        preload: preloadSetting,
        ...options.playerOptions
      };

      playerRef.current = videojs(videoElement, playerOptions);

      // Автоматический выбор качества
      playerRef.current.ready(() => {
        setIsLoading(false);

        const preferredSource = videoSources.find(source =>
          source.label === device.recommendedQuality
        ) || videoSources[0];

        if (preferredSource) {
          playerRef.current.src({
            src: preferredSource.src,
            type: preferredSource.type
          });
        }
      });

      // Обработка ошибок с fallback
      playerRef.current.on('error', (err) => {
        console.error('Ошибка воспроизведения видео:', err);
        setError('Ошибка загрузки видео');

        // Попытка fallback к первому источнику
        if (videoSources[0]) {
          playerRef.current.src({
            src: videoSources[0].src,
            type: videoSources[0].type
          });
        }
      });

      // Отслеживание прогресса загрузки
      playerRef.current.on('loadstart', () => {
        setIsLoading(true);
        setError(null);
      });

      playerRef.current.on('canplay', () => {
        setIsLoading(false);
      });
    }

    // Очистка при размонтировании
    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [videoSources, options]);

  return {
    videoRef,
    deviceInfo,
    isLoading,
    error,
    player: playerRef.current
  };
};

export default useAdaptiveVideo;