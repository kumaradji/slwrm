// PromoPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Slider from "../../../components/Slider/Slider";
import styles from './PromoPage.module.scss';
import { logToServer } from "../../../services/logger";

const PromoPage = () => {
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState('');
  const [hasPurchased, setHasPurchased] = useState(false);
  const navigate = useNavigate();

  const MASTERCLASS_ID = 43;

  // Проверяем, приобрел ли пользователь мастер-класс
  useEffect(() => {
    const checkPurchaseStatus = () => {
      if (!user) {
        setHasPurchased(false);
        return;
      }

      try {
        // Проверяем в localStorage
        const purchasedMasterclasses = JSON.parse(localStorage.getItem(`purchasedMasterclasses_${user.id}`) || '[]');
        const hasBought = purchasedMasterclasses.includes(MASTERCLASS_ID);

        // Или проверяем по API/базе данных (если есть такой эндпоинт)
        // const response = await api.checkMasterclassPurchase(user.id, MASTERCLASS_ID);
        // setHasPurchased(response.data.hasPurchased);

        setHasPurchased(hasBought);
      } catch (error) {
        console.error('Ошибка при проверке статуса покупки:', error);
        setHasPurchased(false);
      }
    };

    checkPurchaseStatus();
  }, [user]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    { src: '/images/promoPage/promo_01.jpg', alt: 'Image 1' },
    { src: '/images/promoPage/promo_02.jpg', alt: 'Image 2' },
    { src: '/images/promoPage/promo_03.jpg', alt: 'Image 3' },
    { src: '/images/promoPage/promo_04.jpg', alt: 'Image 4' },
    { src: '/images/promoPage/promo_05.jpg', alt: 'Image 5' }
  ];

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Дополнительная проверка на случай, если статус изменился
    if (hasPurchased) {
      setNotification('Вы уже приобрели этот мастер-класс');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    const masterClass = {
      id: MASTERCLASS_ID,
      name: 'Мастер-класс "Цветной фон"',
      type: 'masterclass'
    };

    try {
      await addToCart(masterClass);
      setNotification('Мастер-класс добавлен в корзину');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      logToServer(`Ошибка при добавлении мастер-класса в корзину: ${error.message}`, 'error');
      alert(error.message || 'Не удалось добавить мастер-класс в корзину');
    }
  };

  const handleAccessMasterclass = () => {
    // Переход к мастер-классу (замените на ваш путь)
    navigate('/masterclasses/color-background');
  };

  return (
    <div className={styles.promo}>
      {notification && <div className={styles.notification}>{notification}</div>}
      <h1>Мастер-класс "Цветной фон"</h1>
      <p>Дорогие друзья!</p>
      <p>Я рада представить вам мой мастер-класс "Цветной фон" по окрашиванию ткани природными красителями. Этот
        мастер-класс является уникальным руководством, которое поможет вам научиться создавать красивые и неповторимые
        цветовые эффекты на ткани с использованием природных красителей, таких как марена, кошениль, индиго, кампеш и
        другие.</p>
      <p>В процессе мастер-класса я поделюсь с вами всеми своими знаниями и опытом работы с природными красителями. Я
        покажу вам пошаговые инструкции и объясню все нюансы, которые будут наглядно продемонстрированы на видео. Вместе
        с мастер-классом вы получите подробный конспект, содержащий несколько различных рецептов окрашивания ткани
        природными красителями. Эти рецепты помогут вам создавать уникальные цветовые сочетания и экспериментировать с
        разными методами окрашивания.</p>
      <p>Не важно, какой тип ткани вы собираетесь окрашивать - в мастер-классе предусмотрено обучение по работе с
        различными видами материалов. Кроме того, я гарантирую индивидуальный подход к вашему обучению, готова ответить
        на все ваши вопросы и помочь вам выбрать наиболее подходящий рецепт для окрашивания конкретного типа ткани.
        Важно отметить, что для процесса окрашивания вам не потребуется специальное оборудование - все можно сделать на
        обычном столе. Я научу вас техникам окрашивания, которые просты в исполнении, но при этом гарантируют высокое
        качество результата.</p>
      <p><strong>Мастер-класс состоит из:</strong></p>
      <ol>
        <li>Введение</li>
        <li>Необходимые материалы</li>
        <li>Подготовка ткани</li>
        <li>Протравливание ткани</li>
        <li>Процесс окрашивания палантина «Мареновый сад»</li>
        <li>Листья для высветление фона</li>
        <li>Железное одеяло</li>
        <li>Холодный способ экстракции растительных красителей</li>
        <li>Рецепты проверенных растительных красителей</li>
        <li>Уход за изделиями окрашенными растительными красителями</li>
        <li>Заключение</li>
        <li>Льняная скатерть (бонус)</li>
        <li>Исправляем ошибки (бонус)</li>
        <li>Приготовление раствора индиго</li>
        <li>Кошениль</li>
        <li>Окрашивание ткани весенними листьями</li>
        <li>Обработка листьев танинами</li>
        <li>Экопринт на футболке. Графика (бонус)</li>
        <li>Конспекты</li>
      </ol>
      <p>А в качестве бонуса, вы получите видео мастер-класс и конспект по теме "Графика", что позволит вам расширить
        свои навыки и вдохновиться новыми идеями в области окрашивания ткани.</p>
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
        <button className={`${styles.buyButton} ${styles.accessButton}`} onClick={handleAccessMasterclass}>
          Перейти к мастер-классу
        </button>
      ) : (
        <button className={styles.buyButton} onClick={handleAddToCart}>
          Купить
        </button>
      )}
    </div>
  );
};

export default PromoPage;