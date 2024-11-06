// AboutMePage.jsx
import styles from './AboutMePage.module.scss';
import Photo from '../../assets/about_me_photo.jpeg';
import {Helmet} from 'react-helmet';

const AboutMePage = () => {
  return (
    <div className={styles.aboutPage}>
      <Helmet>
        <title>ДушуГрею | Обо мне</title>
        <meta name="description" content="Обо мне. Нина Кольцова. Художник экопринта. ДушуГрею"/>
        <meta name="keywords" content="экопринт, красота, природа, ткани, товары, изделия, ДушуГрею"/>
      </Helmet>

      <div className={styles.aboutPage__content}>
        <div className={styles.aboutPage__left}>
          <h1>Здравствуйте!</h1>
          <p>
            Меня зовут Нина. На моем сайте представлены платки, шарфы, палантины, аксессуары и одежда, окрашенные
            природными
            красителями. Здесь вы найдёте уникальные мастер-классы по окрашивание ткани природными красителями. Марена,
            индиго, кошениль, кампеш, золотарник, ольха и другие природные красители вдохновляют меня на создание
            уникальных
            аксессуаров и одежды.
          </p>

          <p>При создании своих изделий я предпочитаю использовать натуральные ткани, такие как шёлк, шерсть, лён,
            хлопок
            и
            войлок.
          </p>
        </div>

        <div className={styles.aboutPage__photo}>
          <img src={Photo} alt="Nina photo"/>
        </div>
      </div>

      <div className={styles.post}>
        <h2>
          Прикосновение.
        </h2>
        <p>
          Ткани мы доверяем самое главное, а именно - прикосновение к коже! Все, что мы знаем о себе и об этом мире, нам
          рассказывают наши органы чувств. Тактильные ощущения, получаемые от прикасающейся к нам ткани, могут
          успокаивать
          и дарить чувство радости и уюта.
        </p>
        <p>
          Одной из удивительных особенностей натуральных красителей является то, что они изменяют свой тон в зависимости
          от освещения. Это позволяет создавать благородные оттенки, которые легко сочетаются с различными образами.
          Такие
          изделия всегда остаются актуальными и будут радовать вас долгие годы.
        </p>
        <p>
          Моя любовь к рисованию и шитью началась ещё в детстве и всю свою жизнь я рисую и шью. Вот так прямо и всю, как
          карандаш в руки попался, так и поползла по полу кривулины и рожицы рисовать, а потом и книгам досталось, потом
          и
          в платяной шкаф добралась до маминых костюмов, они очень мне в крое и шитье понадобились.
        </p>
        <p>
          Так я и доросла до осознанного состояния и пошла учиться сначала на курсы по батику, а потом в училище по
          росписи ткани. Пиком моей жажды знания стала Театральная Академия, где уже жирной точкой нарисовалось обучение
          специальности Художник-технолог по сценическому костюму.
          И почти всё время пока я училась я работала, как всё успевала непонятно;)
          И все эти пути-дорожки довели меня до изучения Экопринта.
        </p>
        <p>
          Как это водиться, увидела странный рисунок на ткани листа и стало интересно, как же это сделано.
          Мне же, как технологу интересно, как это получается?
        </p>
        <h2>Сходила на очный мастер-класс и началось!</h2>
        <p>
          Около пяти лет назад было немного информации об этом, почти год самостоятельных не очень удачных
          экспериментов,
          и вот наконец мне повезло: Дина Ронина выпустила мастер-класс и все мои знания и эсперименты сложились в
          законченный пазл. Ещё мне повезло поучиться у Ольги Казанской и мои знания еще больше расширились.
        </p>
        <p>
          Всё что я когда-то изучала по истории костюма в Академии, весь мой опыт в росписи ткани, дизайна и пошива
          костюма, сформировали моё видение и стиль в натуральном окрашивании ткани.
          Любовь к лесу и растениям сразу дали мне толчок к своему видению ткани с экопринтом: это - цвет, всё его
          природное разнообразие и рисунок, который я выкладываю на ткани из трав, листьев и цветов. Он всегда
          природный,
          как летняя поляна где много трав и цветов, на нём все они гармонично и цельно колышутся на ветру...
        </p>
        <p>
          Так же я использую способ с зеркальным отражением растений, что создаёт необычный графический природный
          рисунок.
        </p>
        <p>
          За время моих экспериментов с красителями и тканями у меня появились свои способы окрашивания и
          технологии.</p>
        <p>
          Благодаря моим покупателям у меня была возможность покупать ткани и красители, не секрет, что экопринт это
          дорогое увлечение и очень трудозатратное.
        </p>
        <p>
          Поэтому спасибо всем, кто меня поддерживал и поддерживает в моём интересном деле.
          Спасибо мастерам, которые делятся своими знаниями. Я надеюсь и мои подсказки и посты полезны для вас.
        </p>
        <p>
          Меня радуют мастера, которые не только приобрели мой мастер-класс, но и работают по нему!
          Надеюсь у меня появится время и на очные мастер-классы. Знания, переданные из рук в руки, всегда
          воспринимаются
          лучше.
        </p>
        <p>
          Добро пожаловать в мой магазин!
        </p>
        <p>
          С уважением, Нина
        </p>
      </div>
    </div>
  );
};

export default AboutMePage;
