// VideoPlayerWithFallback.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './MarenGarden.module.scss';

const VideoPlayerWithFallback = ({ videoSrc, title, videoKey }) => {
  const [hasError, setHasError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // Более точная детекция только реальных мобильных устройств
    const isMobileUserAgent = /Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    // Показываем кнопку только на телефонах, но не на планшетах и десктопах
    setIsMobile(isMobileUserAgent && !isTablet && isSmallScreen);

    // Логируем информацию об устройстве
    console.log('Device info:', {
      userAgent,
      isIOSDevice,
      isMobileUserAgent,
      isTablet,
      isSmallScreen,
      screenWidth: window.innerWidth,
      willShowMobileButton: isMobileUserAgent && !isTablet && isSmallScreen
    });
  }, []);

  const handleVideoError = (e) => {
    console.error(`❌ Ошибка видео ${title}:`, e.target.error);
    setHasError(true);

    if (e.target.error) {
      const errorMessages = {
        1: 'MEDIA_ERR_ABORTED - Воспроизведение прервано пользователем',
        2: 'MEDIA_ERR_NETWORK - Ошибка сети при загрузке',
        3: 'MEDIA_ERR_DECODE - Ошибка декодирования видео',
        4: 'MEDIA_ERR_SRC_NOT_SUPPORTED - Формат не поддерживается'
      };

      console.log('Код ошибки:', e.target.error.code);
      console.log('Описание:', errorMessages[e.target.error.code] || 'Неизвестная ошибка');
      console.log('Исходник:', videoSrc);
    }
  };

  const testVideoAccess = async () => {
    try {
      const response = await fetch(videoSrc, { method: 'HEAD' });
      console.log('📁 Тест доступа к файлу:', {
        url: videoSrc,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      });
    } catch (error) {
      console.error('❌ Файл недоступен:', error);
    }
  };

  useEffect(() => {
    testVideoAccess();
  }, [videoSrc]);

  return (
    <div key={videoKey}>
      <h3>{title}</h3>

      {/* Диагностическая информация - уберите в продакшене */}
      <div style={{
        background: '#f0f0f0',
        padding: '10px',
        marginBottom: '10px',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        <strong>🔍 Диагностика:</strong><br/>
        iOS: {isIOS ? 'Да' : 'Нет'} |
        Мобильный: {isMobile ? 'Да' : 'Нет'} |
        Ширина экрана: {window.innerWidth}px<br/>
        Файл: {videoSrc}
      </div>

      <div className={styles.masterclass__videoContainer}>
        {!hasError ? (
          <video
            ref={videoRef}
            controls
            preload="none"
            playsInline
            muted={false}
            autoPlay={false}
            key={videoKey}
            onError={handleVideoError}
            onLoadStart={(e) => {
              console.log(`🎬 ${title}: начало загрузки`);
              console.log('Video element:', e.target);
              console.log('Current src:', e.target.currentSrc);
            }}
            onLoadedMetadata={(e) => {
              console.log(`📊 ${title}: метаданные загружены`);
              console.log('Duration:', e.target.duration);
              console.log('VideoWidth:', e.target.videoWidth);
              console.log('VideoHeight:', e.target.videoHeight);
            }}
            onCanPlay={(e) => {
              console.log(`✅ ${title}: готово к воспроизведению`);
              setCanPlay(true);
            }}
            onCanPlayThrough={() => console.log(`🎯 ${title}: может играть до конца`)}
            onWaiting={() => console.log(`⏳ ${title}: ожидание данных`)}
            onStalled={() => console.log(`🚫 ${title}: загрузка остановлена`)}
            onSuspend={() => console.log(`⏸️ ${title}: загрузка приостановлена`)}
            onAbort={() => console.log(`❌ ${title}: загрузка прервана`)}
            onEmptied={() => console.log(`🗑️ ${title}: видео опустошено`)}
            onClick={() => console.log(`🖱️ ${title}: клик по видео`)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            {/* Дополнительные форматы если есть */}
            {/* <source src={videoSrc.replace('.mp4', '.webm')} type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className={styles.videoErrorFallback}>
            <div className={styles.videoErrorContent}>
              <h4>⚠️ Проблема с воспроизведением</h4>
              <p>Видео не может быть воспроизведено в текущем браузере.</p>
              <a
                href={videoSrc}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.videoDirectLink}
              >
                Открыть видео напрямую
              </a>
              {isIOS && (
                <p className={styles.videoHint}>
                  💡 На iOS устройствах попробуйте открыть видео в новой вкладке
                </p>
              )}
            </div>
          </div>
        )}

        {/* Мобильная кнопка - только для телефонов */}
        {isMobile && (
          <div className={styles.mobileVideoButton}>
            <a
              href={videoSrc}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileVideoLink}
              onClick={() => {
                console.log('📱 Открытие видео через мобильную кнопку');
                console.log('URL:', videoSrc);
              }}
            >
              📱 Открыть в полном экране
            </a>

            {/* Кнопка принудительной загрузки для отладки */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  console.log('🔄 Принудительная перезагрузка видео');
                  videoRef.current.load();
                }
              }}
              style={{
                display: 'block',
                margin: '10px auto',
                padding: '8px 16px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🔄 Перезагрузить видео
            </button>
          </div>
        )}
      </div>

      {/* Статус загрузки */}
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: canPlay ? 'green' : 'orange',
        marginTop: '5px'
      }}>
        {canPlay ? '✅ Видео готово' : '⏳ Загрузка...'}
      </div>
    </div>
  );
};

export default VideoPlayerWithFallback;