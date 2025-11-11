// PromoPage.jsx - ОБНОВЛЕННАЯ ВЕРСИЯ
import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Slider from "../../../components/Slider/Slider";
import styles from './PromoPage.module.scss';
import { logToServer } from "../../../services/logger";

const PromoPage = () => {
  const { user } = useAuth();
  const { addToCart, isMasterclassPurchased, loadPurchasedMasterclasses } = useContext(CartContext);
  const [notification, setNotification] = useState('');
  const [hasPurchased, setHasPurchased] = useState(false);
  const navigate = useNavigate();

  const MASTERCLASS_ID = 43;

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

  useEffect(() => {
    if (user) {
      loadPurchasedMasterclasses();
    }
  }, [user, loadPurchasedMasterclasses]);

  useEffect(() => {
    if (user) {
      const purchased = isMasterclassPurchased(MASTERCLASS_ID);
      setHasPurchased(purchased);
    } else {
      setHasPurchased(false);
    }
  }, [user, isMasterclassPurchased]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

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
    navigate('/masterclasses/color-background');
  };

  return (
    <div className={styles.promo}>
      {notification && <div className={styles.notification}>{notification}</div>}
      <h1>Мастер-класс "Цветной фон"</h1>
      {/* ... остальной контент ... */}
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