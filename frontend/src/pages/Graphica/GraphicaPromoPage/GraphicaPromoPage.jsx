// GraphicaPromoPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Slider from "../../../components/Slider/Slider";
import styles from '../../MarenGarden/PromoPage/PromoPage.module.scss';
import { logToServer } from "../../../services/logger";

const GraphicaPromoPage = () => {
  const { user } = useAuth();
  const { addToCart, isMasterclassPurchased, loadPurchasedMasterclasses } = useContext(CartContext);
  const [notification, setNotification] = useState('');
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  const MASTERCLASS_ID = 78;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    { src: '/images/graphica/graphica_promo_1.jpg', alt: 'Графика 1' },
    { src: '/images/graphica/graphica_promo_2.jpg', alt: 'Графика 2' },
    { src: '/images/graphica/graphica_promo_3.jpg', alt: 'Графика 3' },
    { src: '/images/graphica/graphica_promo_4.jpg', alt: 'Графика 4' },
    { src: '/images/graphica/graphica_promo_5.jpg', alt: 'Графика 5' },
    { src: '/images/graphica/graphica_promo_6.jpg', alt: 'Графика 6' },
    { src: '/images/graphica/graphica_promo_7.jpg', alt: 'Графика 7' },
    { src: '/images/graphica/graphica_promo_8.jpg', alt: 'Графика 8' },
    { src: '/images/graphica/graphica_promo_9.jpg', alt: 'Графика 9' },
    { src: '/images/graphica/graphica_promo_10.jpg', alt: 'Графика 10' },
    { src: '/images/graphica/graphica_promo_11.jpg', alt: 'Графика 11' }
  ];

  // --- ЛОГИКА ДОСТУПА ---

  useEffect(() => {
    // Загрузка списка купленных МК при авторизации
    if (user) {
      loadPurchasedMasterclasses();
    }
  }, [user, loadPurchasedMasterclasses]);

  useEffect(() => {
    // Проверка статуса покупки для данного МК
    if (user) {
      const purchased = isMasterclassPurchased(MASTERCLASS_ID);
      setHasPurchased(purchased);
    } else {
      setHasPurchased(false);
    }
  }, [user, isMasterclassPurchased]);

  // --- ЛОГИКА КНОПКИ ---

  const handleAddToCart = async () => {
    if (!user) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/login'); // Используем /login вместо /auth
      return;
    }

    if (hasPurchased) {
      setNotification('Вы уже приобрели этот мастер-класс');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    // Блокируем кнопку
    setIsAdding(true);

    const masterClass = {
      id: MASTERCLASS_ID,
      name: 'Мастер-класс по экопринту "Графика"',
      type: 'masterclass'
    };

    try {
      await addToCart(masterClass);
      setNotification('Мастер-класс добавлен в корзину');
    } catch (error) {
      const errorMessage = error.message || 'Не удалось добавить мастер-класс в корзину.';
      logToServer(`Ошибка при добавлении мастер-класса в корзину: ${error.message}`, 'error');
      setNotification(errorMessage);
    } finally {
      // Снимаем блокировку и очищаем уведомление через 3 секунды
      setIsAdding(false);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleAccessMasterclass = () => {
    // Путь к странице самого мастер-класса "Графика"
    navigate('/masterclasses/graphica');
  };

  return (
    <div className={styles.promo}>
      {notification && <div className={styles.notification}>{notification}</div>}

      <h1>Мастер-класс по экопринту "Графика"</h1>

      <div>
        <p>Дорогие друзья!</p>
        <p>Рада представить вашему вниманию мастер-класс по окрашиванию ткани из растительных волокон (лён, хлопок) в
          технике экопринт «Графика».</p>
        <p>В современном мире искусство натурального окрашивания почти забыто, но интерес к возрождению старых традиций
          подталкивает художников по ткани к использованию растительных красителей. Этот мастер-класс откроет для вас
          удивительные возможности контактного ботанического крашения.</p>

        <p>В процессе мастер-класса я научу вас:</p>
        <ol className={styles.numberedList}>
          <li>Подготавливать ткань и правильно работать с протравами</li>
          <li>Создавать железную воду и работать с железным купоросом</li>
          <li>Использовать танины для достижения различных эффектов</li>
          <li>Подбирать листья для создания графичных отпечатков</li>
          <li>Технологии раскладки и намотки для идеального контакта</li>
        </ol>

        <p>Вы узнаете, какие листья лучше всего подходят для графики: роза, шиповник, клён, дуб, малина, земляника и
          многие другие. Я поделюсь своими наработками, которые собирала с 2009 года, обучаясь у лучших мастеров
          экопринта.</p>

        <p>Вместе с мастер-классом вы получите подробный конспект, содержащий:</p>
        <ol className={styles.numberedList}>
          <li>Полный список необходимых материалов</li>
          <li>Пошаговые инструкции по подготовке ткани и протравливанию</li>
          <li>Рецепты работы с железной водой и железным купоросом</li>
          <li>Технологию создания "железного одеяла"</li>
          <li>Правила ухода за изделиями</li>
        </ol>

        <p>Не важно, новичок вы или опытный мастер - я помогу вам освоить эту удивительную технику. Результат каждый раз
          оказывается индивидуальным и непредсказуемым, что открывает бесконечные творческие горизонты в гармонии с
          природой.</p>

        <p>Используйте возможность возродить старые вещи, создавая на них уникальные графические отпечатки листьев!</p>
      </div>

      <div className={styles.gallery}>
        <Slider
          {...settings}
          autoPlay={true}
          autoPlayTime={6000}
          width="80%"
          height="700px"
          images={images}
        />
      </div>

      {hasPurchased ? (
        <button
          className={`${styles.buyButton} ${styles.accessButton}`}
          onClick={handleAccessMasterclass}
        >
          Перейти к мастер-классу
        </button>
      ) : (
        <button
          className={styles.buyButton}
          onClick={handleAddToCart}
          disabled={isAdding} // Блокировка кнопки во время добавления
        >
          {isAdding ? 'Добавление...' : 'Купить'}
        </button>
      )}
    </div>
  );
};

export default GraphicaPromoPage;