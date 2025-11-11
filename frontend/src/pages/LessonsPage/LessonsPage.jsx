// LessonsPage.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import styles from './LessonsPage.module.scss';
import lessons from './LessonPage/Lessons';
import {Helmet} from 'react-helmet';

export const LessonsPage = () => {
  const siteUrl = 'https://koltsovaecoprint.ru/';

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Базовый курс по технике экопринт',
    description:
      'Бесплатные уроки по технике экопринт от ДушуГрею. Узнайте основы окрашивания тканей растениями.',
    provider: {
      '@type': 'Organization',
      name: 'ДушуГрею',
      url: siteUrl,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      name: 'Базовый курс экопринт',
      courseMode: 'online',
      instructor: {
        '@type': 'Person',
        name: 'Нина Кольцова',
      },
      courseWorkload: 'self-paced',
    },
    hasPart: lessons.map((lesson) => ({
      '@type': 'Lesson',
      name: lesson.title,
      url: `${siteUrl}/lesson/${lesson.id}`,
      image: `${siteUrl}${lesson.image}`,
    })),
  };

  return (
    <div className={styles.lessons}>
      <Helmet>
        <title>ДушуГрею | Базовый курс по технике экопринт</title>
        <meta
          name="description"
          content="Бесплатные уроки про технику экопринт. ДушуГрею"
        />
        <meta
          name="keywords"
          content="экопринт, уроки, мастер-класс, красота, природа, ткани, изделия, ДушуГрею"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Базовый курс по технике экопринт"/>
        <meta
          property="og:description"
          content="Бесплатные уроки по технике экопринт от ДушуГрею."
        />
        <meta
          property="og:image"
          content={`${siteUrl}/images/lessons-cover.jpg`}
        />
        <meta property="og:url" content={`${siteUrl}/lessons`}/>
        <meta property="og:type" content="website"/>

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      <h1>Базовый курс</h1>
      <p>
        Откройте для себя магию экопринта с помощью базового курса, а все
        секреты профессионального мастерства ждут вас в мастер-классах{" "}
        <Link
          to="/graphica-promo"
          style={{color: '#7776B3'}}
          title="Подробности о мастер-классе Графика"
          aria-label="Узнать подробности о мастер-классе Графика"
        >
          "Графика"
        </Link>{" "}
        и{" "}
        <Link
          to="/promo"
          style={{color: '#7776B3'}}
          title="Подробности о мастер-классе Цветной фон"
          aria-label="Узнать подробности о мастер-классе Цветной фон"
        >
          "Цветной фон"
        </Link>.
      </p>

      <div className={styles.lessons__card}>
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            className={styles.lessons__items}
            initial={{
              opacity: index < 2 ? 1 : 0,
              x: index % 2 === 0 ? '-100vw' : '100vw',
            }}
            animate={{opacity: 1, x: 0}}
            transition={{type: 'spring', stiffness: 360}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true, amount: 0.8}}
          >
            <Link to={`/lesson/${lesson.id}`}>
              <h2 className={styles.lessons__items_title}>{lesson.title}</h2>
              <div className={styles.lessons__items_image}>
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100';
                  }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LessonsPage;
