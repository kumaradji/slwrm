// GraphicaChapters.jsx
import React from 'react';
import styles from './GraphicaChapters.module.scss';

const graphicaChapters = [
  {
    id: 1,
    title: 'Льняная скатерть',
    content: (
      <div key="chapter-13">
        <h3>Льняная скатерть</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-13">
            <source src="/videos/marengarden/Lnanaya_skatert_bonus.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    title: 'Окрашивание палантина при помощи железной воды',
    content: (
      <div key="chapter-14">
        <h3>Окрашивание палантина при помощи железной воды</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-14">
            <source src="/videos/marengarden/Ispravlyaem_oshibki_bonus.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: 'Экопринт на футболке. Графика',
    content: (
      <div key="chapter-15">
        <h3>Экопринт на футболке. Графика</h3>
        <div className={styles.masterclass__videoContainer}>
          <video controls key="video-15">
            <source src="/videos/marengarden/Graphica_masterclass.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    title: 'Конспект',
    content: (
      <div key="conspect-graphica" className={styles.conspectItem}>
        <h2>Конспект "Графика"</h2>
        <p>Здесь вы можете ознакомиться с кратким конспектом и скачать его для печати.</p>
        <div className={styles.iframeContainer}>
          <iframe
            title="Превью конспекта Графика"
            src="https://drive.google.com/file/d/16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC/preview"
            allow="autoplay"
          ></iframe>
        </div>
        <h3>Скачайте файл, нажав на кнопку ниже.</h3>
        <a
          href="https://drive.google.com/uc?export=download&id=16n-r79FSDTSoo2bt2c2_kcwrQmLcHnaC"
          className={styles.downloadButton}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          Скачать конспект "Графика"
        </a>
      </div>
    ),
  },
  {
    id: 5,
    title: 'Часто задаваемые вопросы',
    content: (
      <div key="chapter-17" className={styles.faqSection}>
        <h3>Часто задаваемые вопросы</h3>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Как задать вопрос автору?</p>
          <p><strong>Ответ:</strong> Вы можете связаться со мной через форму обратной связи на сайте или напрямую личным сообщением на почту или <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">ВКонтакте</a>.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где вы покупаете марену и индиго?</p>
          <p><strong>Ответ:</strong> Я покупаю у <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">Стаса</a> ферментированную марену. У <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">Стаса</a> марена уже в виде порошка. Я пробовала разные виды, но лучше, чем у <a href="https://vk.com/id3666579" target="_blank" rel="noopener noreferrer">него</a>, не нашла.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить ткани?</p>
          <p><strong>Ответ:</strong> Для покупки <a href="https://www.livemaster.ru/anna-silk" target="_blank" rel="noopener noreferrer">натурального шелка</a> посетите <a href="https://www.livemaster.ru" target="_blank" rel="noopener noreferrer">Ярмарку Мастеров</a>.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить квасцы?</p>
          <p><strong>Ответ:</strong> Я покупаю квасцы на сайте <a href="https://himmag-spb.ru/5018/" target="_blank" rel="noopener noreferrer">himmag-spb.ru</a>. Также можно заказать на <a href="https://www.wildberries.ru/catalog/162599061/detail.aspx" target="_blank" rel="noopener noreferrer">Wildberries</a>.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Какие тряпки лучше использовать для "одеяла"?</p>
          <p><strong>Ответ:</strong> Я рекомендую тряпки ГК "ЕВРОПАК", их можно найти на <a href="https://www.wildberries.ru/catalog/152945806/detail.aspx" target="_blank" rel="noopener noreferrer">Wildberries</a>.</p>
        </div>
        <div className={styles.faqItem}>
          <p><strong>Вопрос:</strong> Где купить стружку кампешевого дерева?</p>
          <p><strong>Ответ:</strong> Вы можете использовать сайт <a href="https://lanaytelar.es/tintes-naturales/" target="_blank" rel="noopener noreferrer">lanaytelar.es</a> для будущих заказов.</p>
        </div>
      </div>
    ),
  }
];

export default graphicaChapters;