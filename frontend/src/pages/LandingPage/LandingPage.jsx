// LandingPage.jsx
import React, { useContext, useEffect } from 'react';
import styles from './LandingPage.module.scss';
import { Link } from 'react-router-dom';
import Leaf01 from '../../assets/leaf_1.png';
import Leaf02 from '../../assets/leaf_2.png';
import images from './ImageList';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/AuthContext';
import LandingPageSlider from '../../components/LandingPageSlider/LandingPageSlider';

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const isVIP = user && user.groups && user.groups.includes('VIP');
  const isRegistered = Boolean(user);

  // Подключение видео с проверкой скорости соединения
  useEffect(() => {
    const loadVideoOrImage = (containerSelector, webmSrc, jpgFallback) => {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      // Очищаем контейнер
      container.innerHTML = '';

      if (navigator.connection && navigator.connection.effectiveType === 'slow-2g') {
        // Показываем изображение для медленного интернета
        const img = document.createElement('img');
        img.src = jpgFallback;
        img.alt = 'Экопринт — процесс окрашивания тканей';
        img.loading = 'lazy';
        container.appendChild(img);
      } else {
        // Загружаем видео
        const video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;

        const sourceWebm = document.createElement('source');
        sourceWebm.src = webmSrc;
        sourceWebm.type = 'video/webm';
        video.appendChild(sourceWebm);

        container.appendChild(video);
      }
    };

    // Первое видео — процесс
    loadVideoOrImage(
      '.landingPage__video.process-video',
      '/videos/landingPage/Process_zadnik.webm',
      '/images/fallback_process.jpg'
    );

    // Второе видео — растения
    loadVideoOrImage(
      '.landingPage__video.plants-video',
      '/videos/landingPage/Rasteniya_zadnik.webm',
      '/images/fallback_plants.jpg'
    );

    // Очистка при размонтировании
    return () => {
      const containers = document.querySelectorAll('.landingPage__video');
      containers.forEach(container => {
        container.innerHTML = '';
      });
    };
  }, []);

  return (
    <div className={styles.landingPage}>
      <Helmet>
        {/* Основное SEO */}
        <title>Экопринт — окрашивание тканей листьями | ДушуГрею</title>
        <meta
          name="description"
          content="Мастер-классы и изделия в технике экопринт. Научитесь окрашивать ткань листьями и цветами, создавая уникальные вещи своими руками."
        />
        <meta
          name="keywords"
          content="экопринт мастер-класс, окрашивание ткани листьями, натуральные красители, обучение экопринту, купить изделия экопринт"
        />
        <link rel="canonical" href="https://koltsovaecoprint.ru" />

        {/* Open Graph / Социальные сети */}
        <meta property="og:title" content="Экопринт — окрашивание тканей листьями | ДушуГрею" />
        <meta property="og:description" content="Научитесь окрашивать ткань листьями и цветами. Мастер-классы и изделия ручной работы." />
        <meta property="og:image" content="https://koltsovaecoprint.ru/images/preview.jpg" />
        <meta property="og:url" content="https://koltsovaecoprint.ru" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ДушуГрею" />
        <meta property="og:locale" content="ru_RU" />

        {/* Schema.org: Основная информация о сайте */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': 'Экопринт — окрашивание тканей листьями | ДушуГрею',
            'description': 'Мастер-классы и изделия в технике экопринт. Научитесь окрашивать ткань листьями и цветами, создавая уникальные вещи своими руками.',
            'url': 'https://koltsovaecoprint.ru',
            'image': 'https://koltsovaecoprint.ru/images/preview.jpg',
            'publisher': {
              '@type': 'Person',
              'name': 'Нина Кольцова',
              'url': 'https://koltsovaecoprint.ru/about',
              'jobTitle': 'Художник по текстилю',
              'sameAs': [
                'https://vk.com/ecoprint_koltsova',
                'https://t.me/ecoprint_koltsova',
                'https://www.instagram.com/nandeshvari_ecoprint/',
                'https://youtube.com/channel/UCuBLmTMRConlw6RXUukWnTw',
                'https://www.tiktok.com/@leafcolorshop_ecoprint',
                'https://www.facebook.com/ecoprint.koltsova',
                'https://www.livemaster.ru/nandesha'
              ]
            }
          })}
        </script>

        {/* FAQ Schema — часто задаваемые вопросы */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Что такое экопринт?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Экопринт — это метод окрашивания ткани с помощью листьев и цветов с использованием протравы. Каждое изделие уникально.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Сложно ли научиться экопринту?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Нет, мой мастер-класс подходит для начинающих. Всё объяснено пошагово, с видео и конспектами.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Где используются изделия в технике экопринт?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Платки, шарфы, палантины, одежда и аксессуары — всё это можно создать в технике экопринт.'
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className={styles.titleBlock}>
        <h1 className={styles.titleBlock__textTitle}>ДушуГрею</h1>
        <h1 className={styles.titleBlock__textCopyright}>© Нина Кольцова</h1>
        <img className={styles.mainLeaf01} src={Leaf01} alt="Листок — символ экопринта" loading="lazy" />
      </div>

      <div className={styles.landingPage__ecoprint}>
        <h1>Экопринт</h1>
        <p>
          Экопринт — это метод натурального окрашивания, который позволяет перенести природные цвета растений на ткань
          или бумагу с использованием солей металлов.
        </p>
        <p>
          Одной из основных особенностей экопринта является его уникальность и индивидуальность. Даже листья с одного и
          того же растения могут окрашивать ткань по-разным. Это открывает бесконечные возможности для творчества и
          экспериментов с различными вариантами окрашивания.
        </p>
      </div>

      <LandingPageSlider autoPlay={true} autoPlayTime={4000} images={images} />

      <div className={styles.landingPage__process}>
        <h1>Процесс</h1>
        <p>
          Процесс начинается с подготовки ткани. Ткань предварительно обрабатывается протравой, содержащей соли
          металлов. Эти соли помогают пигменту из листьев осесть на ткани и закрепиться, обеспечивая стойкость
          окрашивания.
        </p>
        <p>
          Важно отметить, что каждый мастер может использовать свои собственные рецепты и методы обработки, так как
          точного рецепта для всех не существует. Сезон сбора листьев, жесткость воды и другие факторы могут влиять на
          окончательный результат окрашивания.
        </p>
      </div>

      {/* Первое видео — процесс */}
      <div className={`${styles.landingPage__video} process-video`}></div>

      <div className={styles.landingPage__plants}>
        <h1>Растения</h1>
        <p>
          Растения играют ключевую роль в процессе экопринта. Разные виды растений имеют различные свойства окрашивания,
          отдавая свои уникальные оттенки и оттиски на ткань. Некоторые растения могут давать яркие и насыщенные цвета,
          в то время как другие создают более нежные и пастельные оттенки.
        </p>
        <p>
          Например, листья эвкалипта могут создавать оттенки от оливково-зеленого до ярко-оранжевого, а листья ольхи —
          от зеленого до графитового. Это позволяет мастерам экопринта экспериментировать с комбинациями различных
          растений для создания удивительных эффектов и уникальных цветовых схем. Какие растения выбрать и какие
          результаты получить — решение остается за мастером экопринта.
        </p>
      </div>

      <img className={styles.mainLeaf02} src={Leaf02} alt="Листок — символ природы и творчества" loading="lazy" />

      {/* Второе видео — растения */}
      <div className={`${styles.landingPage__video} plants-video`}></div>

      <div className={styles.landingPage__lets_magic}>
        <h1>Давайте волшебничать!</h1>
        <p>
          Экопринт предлагает гармоничный подход к окрашиванию тканей в сотрудничестве с природой. Он позволяет
          сохранить уникальность и неповторимость каждого изделия, созданного в результате этого процесса. Кроме того,
          такой способ окрашивания является экологически дружественным, поскольку не требует использования химических
          красителей или загрязняющих веществ.
        </p>
        <p>
          Предлагаю вам самим попробовать этот уникальный творческий эксперимент рука об руку с природой. Давайте вместе
          волшебничать, если вам кажется, что это сложно и не для вас, то я предлагаю стать смелее.
        </p>
        <p>
          Посмотрите мой{' '}
          <Link to="/lessons" className={styles.landingPage__link}>
            базовый курс
          </Link>{' '}
          по экопринту, и если решитесь — приобретайте мой мастер-класс, в котором я подробно рассказываю все тонкости
          процесса.
        </p>
      </div>

      {!isVIP && (
        <div className={styles.landingPage__bye}>
          <h1>Покупайте мастер-класс!</h1>
          {isRegistered ? (
            <>
              <p>
                Добавьте мастер-класс "Цветной фон" в корзину и после оплаты вы сможете получить полный доступ к
                видеоурокам и конспектам в личном кабинете.
              </p>
              <Link to="/promo" className={styles.landingPage__button}>
                Подробнее
              </Link>
              <p>Цена 7000 рублей.</p>
              <p>Волшебничайте! И Ваша жизнь станет волшебством.</p>
            </>
          ) : (
            <>
              <p>
                Если Вы хотите приобрести мастер-класс "Цветной фон", состоящий из девяти видео и подробных
                конспектов{' '}
                <Link to="/auth" className={styles.landingPage__link}>
                  зарегистрируйтесь
                </Link>.
              </p>
              <p>
                Добавьте его в корзину и после оплаты вы сможете получить полный доступ к видеоурокам и конспектам в
                своём личном кабинете.
              </p>
              <Link to="/promo" className={styles.landingPage__button}>
                Подробнее
              </Link>
              <p>Цена 7000 рублей.</p>
              <p>Волшебничайте! И Ваша жизнь станет волшебством.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;