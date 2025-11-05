// Graphica.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import styles from '../MarenGarden/MarenGarden.module.scss';
import graphicaChapters from './GraphicaChapters';

const Graphica = () => {
  const siteUrl = 'https://koltsovaecoprint.ru/';

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Мастер-класс "Графика"',
    description: 'Мастер-класс по созданию графических композиций в технике экопринт. Графические орнаменты и patterns.',
    provider: {
      '@type': 'Organization',
      name: 'ДушуГрею',
      url: siteUrl,
    },
    hasPart: graphicaChapters.map((chapter) => ({
      '@type': 'CreativeWork',
      name: chapter.title,
      url: `${siteUrl}/graphica/${chapter.id}`,
    })),
  };

  return (
    <div className={styles.masterclass}>
      <Helmet>
        <title>ДушуГрею | Мастер-класс "Графика"</title>
        <meta
          name="description"
          content="Мастер-класс по созданию графических композиций в технике экопринт. Чёткие линии и орнаменты от ДушуГрею."
        />
        <meta
          name="keywords"
          content="экопринт, графика, мастер-класс, графические композиции, орнаменты, ДушуГрею"
        />
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      <h2>Мастер-класс "Графика"</h2>
      <p>
        Добро пожаловать в мастер-класс по созданию графических композиций в технике экопринт!
        Здесь вы освоите искусство работы с растительными волокнами и научитесь создавать
        сложные орнаменты и графические изображения на ткани.
      </p>

      {/* Навигация по главам */}
      <div className={styles.chapters}>
        {graphicaChapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            className={styles.chapter}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.chapterContent}>
              <div className={styles.chapterNumber}>{chapter.id}</div>
              <Link
                to={`/graphica/${chapter.id}`}
                className={styles.chapterLink}
              >
                <h3>{chapter.title}</h3>
                <p>Перейти к материалу →</p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Блок с дополнительной информацией */}
      <div className={styles.infoSection}>
        <h3>О мастер-классе</h3>
        <p>
          В этом мастер-классе мы сосредоточимся на создании четких графических линий,
          геометрических patterns и сложных композиций. Вы научитесь работать с различными
          типами растительных материалов для достижения максимальной выразительности.
        </p>
      </div>

      {/* Призыв к действию */}
      <div className={styles.ctaSection}>
        <h3>Присоединяйтесь к нашей Telegram-группе!</h3>
        <p>
          Следите за новостями, получайте советы и делитесь своими успехами!
        </p>
        <div className={styles.telegramContainer}>
          <a
            href="https://t.me/+5bbgmwAoKHs2Mzcy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.telegramButton}
          >
            Перейти в группу Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Graphica;