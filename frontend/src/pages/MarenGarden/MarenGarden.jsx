// MarenGarden.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './MarenGarden.module.scss';

const MarenGarden = ({ marenGardenChapters = [] }) => {
  const siteUrl = 'https://koltsovaecoprint.ru/';

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Мастер-класс "Цветной фон"',
    description:
      'Подробный мастер-класс по созданию цветного фона в технике экопринт. Практические советы и вдохновение.',
    provider: {
      '@type': 'Organization',
      name: 'ДушуГрею',
      url: siteUrl,
    },
    hasPart: marenGardenChapters.map((chapter) => ({
      '@type': 'CreativeWork',
      name: chapter.title,
      url: `${siteUrl}/masterclass/${chapter.id}`,
    })),
  };

  return (
    <div className={styles.masterclass}>
      <Helmet>
        <title>ДушуГрею | Мастер-класс "Цветной фон"</title>
        <meta
          name="description"
          content="Подробный мастер-класс по созданию цветного фона в технике экопринт от ДушуГрею."
        />
        <meta
          name="keywords"
          content="экопринт, мастер-класс, цветной фон, ДушуГрею, ткани, окрашивание"
        />
        <meta property="og:title" content='Мастер-класс "Цветной фон"' />
        <meta
          property="og:description"
          content="Подробный мастер-класс по технике экопринт."
        />
        <meta
          property="og:image"
          content={`${siteUrl}/images/maren-garden-cover.jpg`}
        />
        <meta property="og:url" content={`${siteUrl}/maren-garden`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      <h2>Мастер-класс "Цветной фон"</h2>
      <p>
        Благодарю вас за то, что вы обратили внимание на моё творчество и
        приобрели этот мастер-класс. Надеюсь, это вдохновило вас на создание
        прекрасных и неповторимых шедевров, создаваемых вместе с природой.
      </p>
      <p>
        Если у вас остались какие-то вопросы, пожалуйста, напишите мне. Я
        обязательно на них отвечу.
      </p>
      <p>Этот мастер-класс лишь "вершина айсберга" бездонного океана экопринта.</p>
      <p>Экспериментируйте, творите, а я всегда помогу вам в этом.</p>

      <div className={styles.chapters}>
        {marenGardenChapters.map((chapter) => (
          <div
            key={chapter.id}
            className={styles.chapter}
          >
            <Link to={`/masterclass/${chapter.id}`} className={styles.link}>
              <div className={styles.chapterContent}>
                <div className={styles.chapterNumber}>{chapter.id}</div>
                <h3>{chapter.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarenGarden;
