// VideoPlayerWithFallback.jsx компонент для воспроизведения видео с паддингом ios
// VideoPlayerWithFallback.jsx
import React, { useState, useEffect } from 'react';
import styles from './MarenGarden.module.scss';

const VideoPlayerWithFallback = ({ videoSrc, title, videoKey }) => {
  const [hasError, setHasError] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
  }, []);

  const handleVideoError = (e) => {
    console.error(`Ошибка видео ${title}:`, e.target.error);
    setHasError(true);

    if (e.target.error) {
      console.log('Код ошибки:', e.target.error.code);
      console.log('Сообщение:', e.target.error.message);
    }
  };

  return (
    <div key={videoKey}>
      <h3>{title}</h3>
      <div className={styles.masterclass__videoContainer}>
        {!hasError ? (
          <video
            controls
            preload="metadata"
            playsInline={true}
            webkit-playsinline="true"
            crossOrigin="anonymous"
            key={videoKey}
            onError={handleVideoError}
            onLoadStart={(e) => {
              console.log(`${title}: начало загрузки`);
              if (isIOS) {
                setTimeout(() => {
                  e.target.load();
                }, 100);
              }
            }}
            onCanPlay={() => console.log(`${title}: готово к воспроизведению`)}
            onWaiting={() => console.log(`${title}: ожидание данных`)}
            onStalled={() => console.log(`${title}: загрузка остановлена`)}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          >
            <source src={videoSrc} type="video/mp4" />
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

        {/* Мобильная кнопка - показываем только на мобильных */}
        {isMobile && (
          <div className={styles.mobileVideoButton}>
            <a
              href={videoSrc}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileVideoLink}
            >
              📱 Открыть в полном экране
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayerWithFallback;