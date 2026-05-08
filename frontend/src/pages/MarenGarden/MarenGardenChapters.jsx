// MarenGardenChapters.jsx
import React from 'react';
import styles from './MarenGarden.module.scss';
import ConspectRedirect from "./MarenGardenContent/ConspectPage/ConspectRedirect";

const marenGardenChapters = [
  {
    id: 1,
    title: 'Введение',
    content: (
      <div key="chapter-1">
        <h2>Введение</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-1">
            <source
              src="/videos/marengarden/Vvedenie.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Очистка ткани от аппрета',
    content: (
      <div key="chapter-2">
        <h2>Очистка ткани от аппрета</h2>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-2">
            <source
              src="/videos/marengarden/Ochistka_tkani_ot_opreta.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Протравливание',
    content: (
      <div key="chapter-3">
        <h3>Протравливание</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-3">
            <source
              src="/videos/marengarden/Protravlivanie.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Приготовление экстракта марены',
    content: (
      <div key="chapter-4">
        <h3>Приготовление экстракта марены</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-4">
            <source
              src="/videos/marengarden/Prigotovlenie_ekstrakta_mareni.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Подготовка железного одеяла',
    content: (
      <div key="chapter-5">
        <h3>Подготовка железного одеяла</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-5">
            <source
              src="/videos/marengarden/Podgotovka_zeleznogo_odeyala.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    title: 'Мареновый сад. Процесс окрашивания',
    content: (
      <div key="chapter-6">
        <h3>Мареновый сад. Процесс окрашивания</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-6">
            <source
              src="/videos/marengarden/Process_okrashivaniya.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 7,
    title: 'Льняная скатерть (бонус)',
    content: (
      <div key="chapter-7">
        <h3>Льняная скатерть (бонус)</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-7">
            <source
              src="/videos/marengarden/Lnanaya_skatert_bonus.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 8,
    title: 'Исправляем ошибки (бонус)',
    content: (
      <div key="chapter-8">
        <h3>Исправляем ошибки (бонус)</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-8">
            <source
              src="/videos/marengarden/Ispravlyaem_oshibki_bonus.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 9,
    title: 'Приготовление раствора индиго',
    content: (
      <div key="chapter-9">
        <h3>Приготовление раствора индиго</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-9">
            <source
              src="/videos/marengarden/Prigotovlenie_rastvora_indigo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 10,
    title: 'Кошениль',
    content: (
      <div>
        <h3>Кошениль</h3>
        <div>
          <div>
            <p>В моей практике кошениль показала себя очень хорошо. Кармин, который находиться в жучках, стоек к свету,
              образует прочный лак, связываясь с солями металлов.</p>
            <p>В конспекте есть рецепт который хорошо подходит для свежих листьев. Вот ещё один способ для окрашивания
              кошенилью с использованием сухих листьев. И в этом случае холодный цвет фуксии с жёлтыми листьями будет
              смотреться не грязно.</p>
            <p>Основной способ. Ткань протравить алюмокалиевыми квасцами 20% от веса ткани. Кошениль (5 гр. при весе
              ткани от 50-70 гр.) измельчить и залить кипятком (всё по конспекту). Нижние листья на полчаса замачиваем в
              железном купоросе 0,1-0,5 гр. с добавление танина чая (около столовой ложки заварки из чайника, можно
              меньше).</p>
            <p>Листья в спирту тогда на фоне тёмных листьев будут контрастные светлые. Одеяло из остатков экстракта
              кошенили. Также можно добавить железный купорос 0,1-0,5 гр. чем меньше железного купороса, тем чище фон
              (этот принцип работает для всех красителей).</p>
            <p>Если вы хотите получить светлый фон и чёткие листья, то листья замачиваются только в железном купоросе с
              добавлением танинов чая (или какие есть). Если одеяло без железного купороса, то будет розовый фон, а с
              добавлением железного купороса - фон будет сиренево-серый в зависимости от концентрации.</p>
            <p>И ещё один способ. При любой концентрации делать второе протравливание. После алюмокалиевых квасцов ткань
              высушить и протравить второй раз железным купоросом до 1 гр. при весе до 100 гр. кратко опустить ткань, и
              вытащить.</p>
            <p>Высушить и работать как в конспекте.</p>
            <p>При работе с кошенилью можно листья обрабатывать и лимонным соком (свежий из лимона). Кармин так же как и
              кампеш чувствителен к Рh, но более стабилен. Для окрашивания хлопка или льна нужно увеличить количество
              кошенили. Очень хорошо добавлять кору дуба в экстракт с кошенилью (примерно 100 гр. коры дуба на 100 гр.
              ткани).</p>
            <p>Танины помогают связаться красителю кошенили с растительным волокном, увеличивается светопрочность. На
              фото палантин из шерсти с шёлком, где было второе протравливание железным купоросом.</p>
          </div>
          <div className={styles.masterclass__images}>
            <img src={'/images/masterclass/M10.jpeg'} alt="Кошениль"/>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 11,
    title: 'Окрашивание ткани весенними листьями',
    content: (
      <div>
        <h3>Окрашивание ткани весенними листьями</h3>
        <div>
          <div>
            <p>Сезон окрашивания свежими листьями начинается с первых майских листьев. Свежие листья дают нежные
              отпечатки, но есть растения, которые еще не набрали танинов и разных красящих веществ. Для того, чтобы
              получить стопроцентный результат, лучше использовать таниновые экстракты и увеличить количество железного
              купороса, так сказать - сыграть на контрасте.</p>
            <p>На фотографии палантин из эксельсиора, где я использовала именно этот приём.</p>
            <p>Экстракт из серёжек ольхи (50 гр. сухого сырья), эксельсиор 25 гр. в алюмокалиевых квасцах 20% от веса
              ткани. Замочила на ночь в экстракте серёжек ольхи. Нижние листья клёна (лучше чтобы черенки были
              красноватые), верхние листья свежие, без обработки, как и нижние.</p>
            <p>Одеяло из остатков экстракта серёжек ольхи и 0,2 гр. медного купороса и 0,6 гр. железного купороса.
              Вместо серёжек ольхи вы можете использовать любой другой экстракт с танинами.</p>
            <p>Весной хорошо красят такие листья: земляника, гравилат, герань, клён, черёмуха, рябинник, дёрен, каштан,
              шиповник, роза.</p>
          </div>
          <div className={styles.masterclass__images}>
            <img src={'/images/masterclass/M11_1.jpeg'} alt="Окрашивание ткани весенними листьями"/>
          </div>
          <div className={styles.masterclass__images}>
            <img src={'/images/masterclass/M11_2.jpeg'} alt="Окрашивание ткани весенними листьями"/>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 12,
    title: 'Обработка листьев танинами',
    content: (
      <div key="chapter-12">
        <h3>Обработка листьев танинами</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-12">
            <source
              src="/videos/marengarden/Obrabotka_listyev_taninami.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 13,
    title: 'Экопринт на футболке. Графика',
    content: (
      <div key="chapter-13">
        <h3>Экопринт на футболке. Графика</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-15">
            <source
              src="/videos/marengarden/Graphica_masterclass.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 14,
    title: 'Конспекты',
    content: <ConspectRedirect/>,
  },

  {
    id: 15,
    title: 'Часто задаваемые вопросы',
    content: (
      <div key="chapter-15" className={styles.faqSection}>
        <h3>Часто задаваемые вопросы</h3>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Как долго доступен мастер-класс?</p>
          <p><strong>Ответ:</strong> Доступ к мастер-классу предоставляется бессрочно.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Могу ли я скачать видео мастер-класса?</p>
          <p><strong>Ответ:</strong> Нет, видео доступны только для просмотра онлайн.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Как задать вопрос автору?</p>
          <p><strong>Ответ:</strong> Вы можете связаться со мной через форму обратной связи на сайте или через закрытую
            группу в Telegram.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где вы покупаете марену и индиго?</p>
          <p><strong>Ответ:</strong> Я покупаю у <a href="https://vk.com/id3666579" target="_blank"
                                                    rel="noopener noreferrer">Стаса</a> ферментированную марену с
            мыльным орехом, чистую марену, а также индиго с дитионитом и каустиком. На год мне достаточно 100 граммов
            марены, и такое же количество индиго с химикатами.
            <br/>
            Для начала я бы рекомендовала купить 50 граммов ферментированной марены с мыльным орехом. На одно изделие
            весом 50–100 граммов обычно уходит от 5 до 15 граммов марены с мыльным орехом. Индиго также можно взять 50
            граммов, так как на одно изделие требуется примерно 3 грамма.
            <br/>
            У <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">Стаса</a> марена уже подготовлена в виде порошка, так что вам не нужно её измельчать и портить кофемолку. Я
            пробовала разные виды марены, но лучше, чем у него, пока не нашла. У <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">Стаса</a> также есть просто марена (без
            мыльного ореха), она тоже измельчена, но её расход немного выше, и цвет получается более тёплый.
            <br/>
            Если вы берёте корень марены, то её оттенок варьируется от красного до кирпичного в зависимости от толщины
            корня. Марена с мыльным орехом — это экстракт, специально подготовленный для профессионального использования
            в красильных барабанах. Этот экстракт более экономичен в расходе.
            <br/>
            Обычный корень марены требует примерно 20 граммов на 100 граммов ткани для получения розового оттенка. Чтобы
            добиться красного цвета, понадобится около 100 граммов корня на 100 граммов ткани.
          </p>
        </div>

        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить ткани?</p>
          <p><strong>Ответ:</strong> Для покупки <a href="https://www.livemaster.ru/anna-silk" target="_blank"
                                                    rel="noopener noreferrer">натурального шелка</a> и товаров для
            батика посетите <a href="https://www.livemaster.ru" target="_blank" rel="noopener noreferrer">Ярмарку
              Мастеров</a>.</p>
        </div>

        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить квасцы?</p>
          <p><strong>Ответ:</strong> Я покупаю квасцы на сайте <a href="https://himmag-spb.ru/5018/" target="_blank"
                                                                  rel="noopener noreferrer">himmag-spb.ru</a>. У них
            сейчас <strong>скидка 50%</strong> на алюмо-калиевые квасцы (500 грамм). Также можно заказать по ссылке: <a
              href="https://www.wildberries.ru/catalog/162599061/detail.aspx?targetUrl=MS&size=270202894"
              target="_blank" rel="noopener noreferrer">Wildberries</a>.</p>
        </div>

        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Какие тряпки лучше использовать для "одеяла"?</p>
          <p><strong>Ответ:</strong> Я рекомендую тряпки ГК "ЕВРОПАК" для уборки (50х60 см, 10 шт.). Их можно найти
            на <a href="https://www.wildberries.ru/catalog/152945806/detail.aspx?targetUrl=MS&size=255816854"
                  target="_blank" rel="noopener noreferrer">Wildberries</a>.</p>
        </div>

        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить стружку кампешевого дерева?</p>
          <p><strong>Ответ:</strong>
            Вы можете использовать сайт <a href="https://lanaytelar.es/tintes-naturales/" target="_blank"
                                           rel="noopener noreferrer">lanaytelar.es</a> для будущих заказов. Однако
            учтите, что у них есть проблемы с оплатой, и они не работают с Россией. Я заказываю через знакомых, через
            Прибалтику, но это тоже довольно сложно. Возможно, у вас есть знакомые, которые смогут помочь. Я покупаю
            стружку кампешевого дерева там.
          </p>
        </div>
      </div>
    ),
  }
]

export default marenGardenChapters;