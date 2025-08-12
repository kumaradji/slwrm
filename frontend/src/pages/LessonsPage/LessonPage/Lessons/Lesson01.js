// Lessons01.js
import React from "react";
import useAdaptiveVideo from "../hooks/useAdaptiveVideo";
import styles from './Lesson.module.scss';
import "video.js/dist/video-js.css";

const Lesson01 = () => {
  // Источники видео с разными качествами
  const videoSources = [
    { src: '/videos/lessons/Lesson1-720p.mp4', type: 'video/mp4', label: '720p HD' },
    { src: '/videos/lessons/Lesson1-480p.webm', type: 'video/webm', label: '480p' },
    { src: '/videos/lessons/Lesson1-360p.mp4', type: 'video/mp4', label: '360p' },
    // Fallback к оригинальному файлу
    { src: '/videos/lessons/Lesson1.mp4', type: 'video/mp4', label: '720p (original)' }
  ];

  // Настройки видеоплеера
  const videoOptions = {
    preload: 'metadata',
    playbackRates: [0.75, 1, 1.25, 1.5],
    playerOptions: {
      // Дополнительные настройки Video.js
    }
  };

  const { videoRef, deviceInfo, isLoading, error } = useAdaptiveVideo(videoSources, videoOptions);

  return (
    <div className={styles.lesson}>
      <div className={styles.lesson__content}>
        <h2 className={styles.lesson__title}>
          🌿 Урок 1: Создание железной воды для эко-принт
        </h2>

        <div className={styles.lesson__text}>
          <p>Самый простой способ попробовать, как оставляет свой след лист на ткани - это взять и сделать самому. Многих
            останавливает использование протравы.</p>

          <p>В стародавние времена для обработки ткани и шерсти перед крашением использовали жижу из-под точильного камня,
            золу из печи, рассол из-под квашеной капусты... разные секреты хранили старые мастера.</p>

          <p>Сейчас, конечно, все протравы можно купить. Самые популярные из них - железный и медный купорос и
            алюмокалиевые квасцы. А если у вас нет возможности их купить?!</p>

          <p>Вдруг вы на необитаемом острове или в тайге дремучей;), а вдохновение не даёт вам покоя... На помощь придёт
            ржавая железяка! Из куска старого ржавого железа, воды и уксуса можно самостоятельно настоять железную
            воду.</p>

          <p>Залейте в банку этот раствор и положите в него железяку. Через 3 дня настой станет желтеть. Процедив через
            ветошь воду, вы сможете воспользоваться великой магией химии окисленного железа.</p>

          <p className={styles.lesson__conclusion}>
            Волшебничайте! ✨
          </p>
        </div>

        {/* Адаптивный видеоплеер */}
        <div className={styles.videoContainer}>
          {error && <div className={styles.videoError}>❌ {error}</div>}
          {isLoading && <div className={styles.videoLoading}>📹 Загрузка видео...</div>}

          <div
            ref={videoRef}
            className={styles.videoPlayer}
          />
        </div>

        {/* Информация о качестве видео */}
        {deviceInfo.recommendedQuality && (
          <div className={styles.qualityInfo}>
            <div className={styles.qualityInfo__title}>
              🎯 Оптимизировано для вашего устройства:
            </div>
            <div className={styles.qualityInfo__details}>
              <div><strong>Устройство:</strong> {deviceInfo.deviceType}</div>
              <div><strong>Соединение:</strong> {deviceInfo.connectionSpeed}</div>
              <div><strong>Рекомендуемое качество:</strong> {deviceInfo.recommendedQuality}</div>
            </div>
            <div className={styles.qualityInfo__note}>
              * Качество автоматически адаптируется под ваше устройство и скорость интернета
            </div>
          </div>
        )}

        {/* Дополнительные материалы */}
        <div className={styles.additionalMaterials}>
          <h3>📋 Что понадобится:</h3>
          <ul>
            <li>Кусок ржавого железа</li>
            <li>Вода</li>
            <li>Столовый уксус</li>
            <li>Стеклянная банка</li>
            <li>Ткань или марля для процеживания</li>
          </ul>

          <h3>⏰ Время приготовления:</h3>
          <p>3-5 дней для настаивания железной воды</p>
        </div>
      </div>
    </div>
  );
};

export default Lesson01;