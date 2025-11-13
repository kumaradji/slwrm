// LandingPage.jsx
import React, { useContext } from 'react';
import styles from './LandingPage.module.scss';
import { Link } from "react-router-dom";
import Leaf01 from "../../assets/leaf_1.png";
import Leaf02 from "../../assets/leaf_2.png";
import images from "./ImageList";
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/AuthContext';
import LandingPageSlider from "../../components/LandingPageSlider/LandingPageSlider";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const isVIP = user && user.groups && user.groups.includes('VIP');
  const isVIP2 = user && user.groups && user.groups.includes('VIP2');
  const isRegistered = Boolean(user);

  // SEO данные вынесены в отдельную структуру для лучшей поддержки
  const seoData = {
    title: "Экопринт — натуральное окрашивание тканей листьями | Мастер-класс от Нины Кольцовой",
    description: "Изучите технику экопринт с мастером Ниной Кольцовой. Видеокурс из 9 уроков по натуральному окрашиванию тканей растениями. Создавайте уникальные изделия своими руками. Цена 7000₽",
    keywords: "экопринт, мастер-класс экопринт, окрашивание ткани листьями, натуральные красители, обучение экопринту, Нина Кольцова, видеокурс экопринт, купить мастер-класс",
    canonicalUrl: "https://koltsovaecoprint.ru/",
    ogImage: "https://koltsovaecoprint.ru/images/og-ecoprint-masterclass.jpg",
    courseImage: "https://koltsovaecoprint.ru/images/ecoprint-course-preview.jpg"
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": "https://koltsovaecoprint.ru/#course",
        "name": "Мастер-класс по экопринту «Цветной фон»",
        "description": "Полный видео-курс по натуральному окрашиванию тканей растениями от мастера Нины Кольцовой. 9 подробных видеоуроков с конспектами",
        "provider": {
          "@type": "Person",
          "@id": "https://koltsovaecoprint.ru/#instructor",
          "name": "Нина Кольцова",
          "jobTitle": "Мастер экопринта",
          "url": "https://koltsovaecoprint.ru",
          "sameAs": [
            "https://www.instagram.com/nina_koltsova_ecoprint/"
          ]
        },
        "offers": {
          "@type": "Offer",
          "price": "7000",
          "priceCurrency": "RUB",
          "availability": "https://schema.org/InStock",
          "url": "https://koltsovaecoprint.ru/promo",
          "priceValidUntil": "2025-12-31",
          "seller": {
            "@id": "https://koltsovaecoprint.ru/#instructor"
          }
        },
        "courseMode": "online",
        "educationalLevel": "beginner",
        "teaches": [
          "экопринт",
          "натуральное окрашивание тканей",
          "работа с растительными красителями",
          "техники протравки ткани",
          "создание уникальных принтов"
        ],
        "numberOfCredits": 9,
        "duration": "P30D",
        "url": "https://koltsovaecoprint.ru",
        "image": seoData.courseImage,
        "inLanguage": "ru",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "87",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://koltsovaecoprint.ru/#website",
        "url": "https://koltsovaecoprint.ru/",
        "name": "ДушуГрею - Экопринт мастер-классы",
        "description": seoData.description,
        "publisher": {
          "@id": "https://koltsovaecoprint.ru/#instructor"
        },
        "inLanguage": "ru"
      },
      {
        "@type": "Organization",
        "@id": "https://koltsovaecoprint.ru/#organization",
        "name": "ДушуГрею",
        "url": "https://koltsovaecoprint.ru/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://koltsovaecoprint.ru/images/logo.png"
        },
        "founder": {
          "@id": "https://koltsovaecoprint.ru/#instructor"
        },
        "sameAs": [
          "https://www.instagram.com/dushugreyu/"
        ]
      }
    ]
  };

  return (
    <div className={styles.landingPage}>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />

        {/* Дополнительные важные мета-теги */}
        <meta name="author" content="Нина Кольцова" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="ru" />
        <link rel="canonical" href={seoData.canonicalUrl} />

        {/* Open Graph для социальных сетей */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.ogImage} />
        <meta property="og:image:alt" content="Мастер-класс по экопринту - натуральное окрашивание тканей" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ДушуГрею - Экопринт мастер-классы" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.ogImage} />
        <meta name="twitter:image:alt" content="Мастер-класс по экопринту - натуральное окрашивание тканей" />

        {/* Структурированные данные JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

        {/* Preload критически важных ресурсов */}
        <link rel="preload" href={Leaf01} as="image" />
        <link rel="preload" href="/videos/landingPage/Process_zadnik.webm" as="video" type="video/webm" />

        {/* DNS prefetch для внешних ресурсов */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </Helmet>

      {/* Основной заголовочный блок */}
      <div className={styles.titleBlock}>
        <h1 className={styles.titleBlock__textTitle}>ДушуГрею</h1>
        <h1 className={styles.titleBlock__textCopyright}>© Нина Кольцова</h1>
        <img
          className={styles.mainLeaf01}
          src={Leaf01}
          alt="Декоративный лист для экопринта - натуральное окрашивание тканей"
          loading="eager"
          width="150"
          height="200"
        />
      </div>

      {/* Основной контент */}
      <main>
        <section className={styles.landingPage__ecoprint} aria-labelledby="ecoprint-heading">
          <h1 id="ecoprint-heading">Экопринт</h1>
          <p>
            Экопринт — это метод натурального окрашивания, который позволяет перенести природные цвета растений на ткань
            или бумагу с использованием солей металлов.
          </p>
          <p>
            Одной из основных особенностей экопринта является его уникальность и индивидуальность. Даже листья с одного и
            того же растения могут окрашивать ткань по-разному. Это открывает бесконечные возможности для творчества и
            экспериментов с различными вариантами окрашивания.
          </p>
        </section>

        <section aria-label="Галерея работ экопринт">
          <LandingPageSlider autoPlay={true} autoPlayTime={4000} images={images}/>
        </section>

        <section className={styles.landingPage__process} aria-labelledby="process-heading">
          <h1 id="process-heading">Процесс окрашивания</h1>
          <p>
            Процесс начинается с подготовки ткани. Ткань предварительно обрабатывается протравой, содержащей соли
            металлов. Эти соли помогают пигменту из листьев осесть на ткани и закрепиться, обеспечивая стойкость
            окрашивания.
          </p>
          <p>
            Важно отметить, что каждый мастер может использовать свои собственные рецепты и методы обработки, так как
            точного универсального рецепта не существует. Сезон сбора листьев, жесткость воды и другие факторы могут влиять на
            окончательный результат окрашивания.
          </p>
        </section>

        <section className={styles.landingPage__video} aria-label="Видео процесса экопринт">
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Демонстрация процесса экопринт"
          >
            <source
              src="/videos/landingPage/Process_zadnik.webm"
              type="video/webm"
            />
            <source
              src="/videos/landingPage/Process_zadnik.mp4"
              type="video/mp4"
            />
            <p>Ваш браузер не поддерживает воспроизведение видео.</p>
          </video>
        </section>

        <section className={styles.landingPage__plants} aria-labelledby="plants-heading">
          <h1 id="plants-heading">Растения для экопринта</h1>
          <p>
            Растения играют ключевую роль в процессе экопринта. Разные виды растений имеют различные свойства окрашивания,
            отдавая свои уникальные оттенки и отпечатки на ткань. Некоторые растения могут давать яркие и насыщенные цвета,
            в то время как другие создают более нежные и пастельные оттенки.
          </p>
          <p>
            Например, листья эвкалипта могут создавать оттенки от оливково-зеленого до ярко-оранжевого, а листья ольхи — от
            зеленого до графитового. Это позволяет мастерам экопринта экспериментировать с комбинациями различных растений
            для создания удивительных эффектов и уникальных цветовых схем.
          </p>
        </section>

        <img
          className={styles.mainLeaf02}
          src={Leaf02}
          alt="Декоративный элемент - лист для экопринт техники"
          loading="lazy"
          width="120"
          height="160"
        />

        <section className={styles.landingPage__video} aria-label="Видео о растениях для экопринт">
          <video
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label="Растения используемые в технике экопринт"
          >
            <source
              src="/videos/landingPage/Rasteniya_zadnik.webm"
              type="video/webm"
            />
            <source
              src="/videos/landingPage/Rasteniya_zadnik.mp4"
              type="video/mp4"
            />
            <p>Ваш браузер не поддерживает воспроизведение видео.</p>
          </video>
        </section>

        <section className={styles.landingPage__lets_magic} aria-labelledby="magic-heading">
          <h1 id="magic-heading">Давайте волшебничать!</h1>
          <p>
            Экопринт предлагает гармоничный подход к окрашиванию тканей в сотрудничестве с природой. Он позволяет
            сохранить уникальность и неповторимость каждого изделия, созданного в результате этого процесса. Кроме того,
            такой способ окрашивания является экологически дружественным, поскольку не требует использования химических
            красителей или загрязняющих веществ.
          </p>
          <p>
            Предлагаю вам самим попробовать этот уникальный творческий эксперимент рука об руку с природой. Давайте вместе
            волшебничать! Если вам кажется, что это сложно и не для вас, то я предлагаю стать смелее.
          </p>
          <p>
            Посмотрите мой{' '}<Link to="/lessons" className={styles.landingPage__link} title="Базовый курс по экопринту">базовый курс</Link> по экопринту,
            и если решитесь – приобретайте мои мастер-классы, в которых я подробно рассказываю все тонкости процесса.
          </p>
        </section>

        {/* Блок мастер-класса "Цветной фон" */}
        {!isVIP && (
          <section className={styles.landingPage__masterclass} aria-labelledby="masterclass-color-heading">
            <h1 id="masterclass-color-heading">Мастер-класс "Цветной фон"</h1>
            <p>
              Полный видео-курс по натуральному окрашиванию тканей растениями. Девять подробных видеоуроков с конспектом из 35 страниц и статьями,
              где я делюсь всеми секретами техники экопринт. А в качестве бонуса, вы получите видео мастер-класс и конспект из 7 страниц по теме "Графика", что позволит вам расширить свои навыки и вдохновиться новыми идеями в области окрашивания ткани.
            </p>
            <p>
              Вы научитесь работать с различными растениями, создавать сложные цветовые композиции и освоите все этапы
              процесса окрашивания от подготовки ткани до финального результата.
            </p>
            {isRegistered ? (
              <>
                <Link
                  to="/promo"
                  className={styles.landingPage__button}
                  title="Подробности о мастер-классе Цветной фон"
                  aria-label="Узнать подробности о мастер-классе Цветной фон"
                >
                  Подробнее о мастер-классе
                </Link>
                <p><strong>Цена: 7000 рублей</strong></p>
              </>
            ) : (
              <>
                <p>
                  <Link
                    to="/auth"
                    className={styles.landingPage__link}
                    title="Регистрация для покупки мастер-класса"
                  >
                    Зарегистрируйтесь
                  </Link>{' '}
                  чтобы приобрести мастер-класс
                </p>
                <Link
                  to="/promo"
                  className={styles.landingPage__button}
                  title="Подробности о мастер-классе по экопринту"
                  aria-label="Узнать подробности о мастер-классе Цветной фон"
                >
                  Подробнее о мастер-классе
                </Link>
                <p><strong>Цена: 7000 рублей</strong></p>
              </>
            )}
          </section>
        )}

        {/* Блок мастер-класса "Графика" */}
        {!isVIP2 && (
          <section className={styles.landingPage__masterclass} aria-labelledby="masterclass-graphica-heading">
            <h1 id="masterclass-graphica-heading">Мастер-класс "Графика"</h1>
            <p>
              Мастер-класс по созданию графических композиций в технике экопринт по окрашиванию натуральных тканей (лён, хлопок, шёлк, вискоза) состоит
              из трёх подробных видео и конспекта с дополнительной информацией из 7 страниц.
            </p>

            <p>
              Окрашивать ткани из растительных волокон не просто. За долгие годы работы в технике экопринта я нашла способ
              окрашивания таких тканей растениями с хорошим результатом. Графический, чёткий рисунок будет эффектно выглядеть на тканях
              растительного происхождения, также подойдёт и для шёлка, шерсти, вискозы и тканей с небольшим содержанием синтетики.
              Для этого способа окрашивания тканей не нужны дорогие экзотические красители, а только листья и доступные протравы.
              Вы научитесь окрашивать ткани без особых хлопот. Техника "графика" — отличное начало для погружения в увлекательный мир экопринта.
            </p>
            <p>
              Вы сможете окрасить большую скатерть, футболку, палантин или платок, применяя мои наработки.
              Этот мастер-класс предназначен для тех, кто ценит своё время, ведь я делюсь бесценным опытом, накопленным за годы.
            </p>
            {isRegistered ? (
              <>
                <Link
                  to="/graphica-promo"
                  className={styles.landingPage__button}
                  title="Подробности о мастер-классе Графика"
                  aria-label="Узнать подробности о мастер-классе Графика"
                >
                  Подробнее о мастер-классе
                </Link>
                <p><strong>Цена: 2000 рублей</strong></p>
              </>
            ) : (
              <>
                <p>
                  <Link
                    to="/auth"
                    className={styles.landingPage__link}
                    title="Регистрация для покупки мастер-класса"
                  >
                    Зарегистрируйтесь
                  </Link>{' '}
                  чтобы приобрести мастер-класс
                </p>
                <Link
                  to="/graphica-promo"
                  className={styles.landingPage__button}
                  title="Подробности о мастер-классе Графика"
                  aria-label="Узнать подробности о мастер-классе Графика"
                >
                  Подробнее о мастер-классе
                </Link>
                <p><strong>Цена: 2000 рублей</strong></p>
              </>
            )}
          </section>
        )}

        {/* Финальное сообщение */}
        <section className={styles.landingPage__bye} aria-labelledby="final-heading">
          <h1 id="final-heading">Волшебничайте!</h1>
          <p>
            Приобретайте мои мастер-классы и откройте для себя удивительный мир экопринта. После оплаты вы получите
            полный доступ к видеоурокам и конспектам в своём личном кабинете.
          </p>
          <p><em>Волшебничайте! И Ваша жизнь станет волшебством.</em></p>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;