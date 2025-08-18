// LandingPage.jsx
import React, {useContext, useState, useEffect} from 'react';
import styles from './LandingPage.module.scss';
import {Link} from "react-router-dom";
import Leaf01 from "../../assets/leaf_1.png";
import Leaf02 from "../../assets/leaf_2.png";
import images from "./ImageList";
import {Helmet} from 'react-helmet';
import {AuthContext} from '../../context/AuthContext';
import LandingPageSlider from "../../components/LandingPageSlider/LandingPageSlider";

const LandingPage = () => {
  const {user} = useContext(AuthContext);
  const isVIP = user && user.groups && user.groups.includes('VIP');
  const isRegistered = Boolean(user);

  // Состояние для управления загрузкой видео
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);

  useEffect(() => {
    // Проверяем размер экрана и качество соединения
    const checkVideoSupport = () => {
      const isDesktop = window.innerWidth > 768;
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

      // Определяем слабое соединение
      const isSlowConnection = connection && (
        connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g' ||
        connection.saveData === true
      );

      setIsLowBandwidth(isSlowConnection);
      setShouldPlayVideo(isDesktop && !isSlowConnection);
    };

    checkVideoSupport();

    // Слушаем изменения размера экрана
    const handleResize = () => {
      checkVideoSupport();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Компонент для оптимизированного видео
  const OptimizedVideo = ({ baseName, alt = "Background video" }) => {
    const [hasError, setHasError] = useState(false);

    if (!shouldPlayVideo || hasError) {
      return (
        <div className={styles.videoPlaceholder}>
          {isLowBandwidth && (
            <p className={styles.videoPlaceholderText}>
              Видео скрыто для экономии трафика
            </p>
          )}
        </div>
      );
    }

    return (
      <video
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
        aria-label={alt}
      >
        <source
          src={`/videos/landingPage/${baseName}.webm`}
          type="video/webm"
        />
        <source
          src={`/videos/landingPage/${baseName}.mp4`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
        Ваш браузер не поддерживает тег видео.
      </video>
    );
  };

  return (
    <div className={styles.landingPage}>
      <Helmet>
        <title>Экопринт мастер-класс от Нины Кольцовой | Натуральное окрашивание тканей растениями</title>
        <meta
          name="description"
          content="🍃 Изучите экопринт с мастером Ниной Кольцовой! Полный видео-курс по натуральному окрашиванию тканей листьями и растениями. 9 уроков + конспекты. Цена 7000₽"
        />
        <meta
          name="keywords"
          content="экопринт мастер класс, Нина Кольцова экопринт, окрашивание ткани листьями, натуральные красители растения, обучение экопринт онлайн, купить курс экопринт, видеоуроки экопринт, эко окрашивание ткани"
        />

        {/* Open Graph для социальных сетей */}
        <meta property="og:title" content="Экопринт мастер-класс от Нины Кольцовой | ДушуГрею" />
        <meta property="og:description" content="Изучите натуральное окрашивание тканей растениями. Полный видео-курс с 9 уроками и конспектами за 7000₽" />
        <meta property="og:image" content="https://koltsovaecoprint.ru/preview.jpg" />
        <meta property="og:url" content="https://koltsovaecoprint.ru" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ДушуГрею - Экопринт мастер-классы и изделия из экопринта" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Экопринт мастер-класс от Нины Кольцовой" />
        <meta name="twitter:description" content="Изучите натуральное окрашивание тканей растениями. 9 видеоуроков + конспекты" />
        <meta name="twitter:image" content="https://koltsovaecoprint.ru/preview.jpg" />

        {/* Структурированные данные JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Мастер-класс по экопринту «Цветной фон»",
            "description": "Полный видео-курс по натуральному окрашиванию тканей растениями от мастера Нины Кольцовой",
            "provider": {
              "@type": "Person",
              "name": "Нина Кольцова",
              "jobTitle": "Художник по текстилю",
              "url": "https://koltsovaecoprint.ru"
            },
            "offers": {
              "@type": "Offer",
              "price": "7000",
              "priceCurrency": "RUB",
              "availability": "https://schema.org/InStock",
              "url": "https://koltsovaecoprint.ru/promo"
            },
            "courseMode": "online",
            "educationalLevel": "beginner",
            "teaches": [
              "экопринт",
              "натуральное окрашивание тканей",
              "работа с растительными красителями",
              "техники протравки ткани"
            ],
            "numberOfCredits": 9,
            "url": "https://koltsovaecoprint.ru",
            "image": "https://koltsovaecoprint.ru/course-image.jpg"
          })}
        </script>

        {/* Дополнительные мета-теги */}
        <meta name="author" content="Нина Кольцова" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://koltsovaecoprint.ru" />

        {/* Preconnect для быстрой загрузки */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://koltsovaecoprint.ru" />

        {/* Языки и регион */}
        <meta httpEquiv="content-language" content="ru" />
        <meta name="geo.region" content="RU" />
        <meta name="geo.placename" content="Россия" />
      </Helmet>

      <div className={styles.titleBlock}>
        <h1 className={styles.titleBlock__textTitle}>ДушуГрею</h1>
        <h1 className={styles.titleBlock__textCopyright}>© Нина Кольцова</h1>
        <img className={styles.mainLeaf01} src={Leaf01} alt="Leaf image"/>
      </div>

      <section className={styles.landingPage__ecoprint}>
        <h2>Что такое экопринт?</h2>
        <br/>
        <br/>
        <p>
          <strong>Экопринт</strong> - это метод натурального окрашивания, который позволяет перенести природные цвета растений на ткань
          или бумагу с использованием солей металлов. Это экологичная альтернатива химическим красителям.
        </p>
        <p>
          Одной из основных особенностей экопринта является его <em>уникальность и индивидуальность</em>. Даже листья с одного и
          того же растения могут окрашивать ткань по-разному. Это открывает бесконечные возможности для творчества и
          экспериментов с различными вариантами окрашивания.
        </p>

        {/* FAQ секция для SEO */}
        <div className={styles.faqSection} itemScope itemType="https://schema.org/FAQPage">
          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">Сколько стоит мастер-класс по экопринту?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">Стоимость полного видео-курса составляет 7000 рублей. В курс входят 9 видеоуроков и подробные конспекты.</p>
            </div>
          </div>

          <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <h3 itemProp="name">Подходит ли экопринт для начинающих?</h3>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p itemProp="text">Да, мастер-класс подходит для новичков. Нина Кольцова подробно объясняет все этапы процесса от подготовки до финальной обработки.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingPageSlider autoPlay={true} autoPlayTime={4000} images={images}/>

      <section className={styles.landingPage__process}>
        <h2>Процесс экопринта пошагово</h2>
        <br/>
        <br/>
        <div className={styles.processSteps}>
          <div className={styles.processStep}>
            <h3>1. Подготовка ткани</h3>
            <p>
              Процесс начинается с подготовки ткани. Ткань предварительно обрабатывается <strong>протравой</strong>, содержащей соли
              металлов. Эти соли помогают пигменту из листьев осесть на ткани и закрепиться, обеспечивая стойкость
              окрашивания.
            </p>
          </div>

          <div className={styles.processStep}>
            <h3>2. Выбор растений</h3>
            <p>
              Выбираются подходящие растения: эвкалипт, ольха, клён, дуб и многие другие. Каждое растение даёт свой уникальный цвет и рисунок.
            </p>
          </div>

          <div className={styles.processStep}>
            <h3>3. Окрашивание</h3>
            <p>
              Важно отметить, что каждый мастер может использовать свои собственные рецепты и методы обработки, так как
              точного рецепта для всех не существует. Сезон сбора листьев, жесткость воды и другие факторы могут влиять на
              окончательный результат окрашивания.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.landingPage__video}>
        <OptimizedVideo
          baseName="Process_zadnik"
          alt="Видео процесса экопринта"
        />
      </div>

      <div className={styles.landingPage__plants}>
        <h1>Растения</h1>
        <br/>
        <br/>
        <p>
          Растения играют ключевую роль в процессе экопринта. Разные виды растений имеют различные свойства окрашивания,
          отдавая свои уникальные оттенки и оттиски на ткань. Некоторые растения могут давать яркие и насыщенные цвета,
          в то время как другие создают более нежные и пастельные оттенки.
        </p>
        <p>
          Например, листья эвкалипта могут создавать оттенки от оливково-зеленого до ярко-оранжевого, а листья ольхи от
          зеленого до графитового. Это позволяет мастерам экопринта экспериментировать с комбинациями различных растений
          для создания удивительных эффектов и уникальных цветовых схем. Какие растения выбрать и какие результаты
          получить - решение остается за мастером экопринта.
        </p>
      </div>

      <img className={styles.mainLeaf02} src={Leaf02} alt="Leaf image"/>

      <div className={styles.landingPage__video}>
        <OptimizedVideo
          baseName="Rasteniya_zadnik"
          alt="Видео о растениях для экопринта"
        />
      </div>

      <div className={styles.landingPage__lets_magic}>
        <h1>Давайте волшебничать!</h1>
        <br/>
        <br/>

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
          Посмотрите мой{' '}<Link to="/lessons" className={styles.landingPage__link}> базовый курс</Link> по экопринту, и если
          решитесь – приобретайте мой мастер-класс, в котором я подробно рассказываю все тонкости процесса.
        </p>
      </div>

      {!isVIP && (
        <div className={styles.landingPage__bye}>
          <h1>Покупайте мастер-класс!</h1>
          <br/>
          <br/>
          {isRegistered ? (
            <>
              <p>
                Добавьте мастер-класс "Цветной фон" в корзину и после оплаты
                вы сможете получить полный доступ к видеоурокам и конспектам в личном кабинете.
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
                <Link to="/auth" className={styles.landingPage__link}>зарегистрируйтесь</Link>.
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
          <br/>
        </div>
      )}
    </div>
  );
};

export default LandingPage;