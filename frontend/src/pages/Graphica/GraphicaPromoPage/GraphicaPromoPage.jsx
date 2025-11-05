// GraphicaPromoPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import Slider from "../../../components/Slider/Slider";
import styles from '../../MarenGarden/PromoPage/PromoPage.module.scss';
import { logToServer } from "../../../services/logger";

const GraphicaPromoPage = () => {
  const { user } = useAuth();
  const { addToCart } = useContext(CartContext);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const images = [
    { src: '/images/graphica/promo_01.jpg', alt: 'Графика 1' },
    { src: '/images/graphica/promo_02.jpg', alt: 'Графика 2' },
    { src: '/images/graphica/promo_03.jpg', alt: 'Графика 3' },
    { src: '/images/graphica/promo_04.jpg', alt: 'Графика 4' },
    { src: '/images/graphica/promo_05.jpg', alt: 'Графика 5' }
  ];

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const masterClass = { id: 44, name: 'Мастер-класс "Графика"' }; // Изменил ID и название

    try {
      await addToCart(masterClass);
      setNotification('Мастер-класс добавлен в корзину');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      logToServer(`Ошибка при добавлении мастер-класса в корзину: ${error.message}`, 'error');
      alert(error.message || 'Не удалось добавить мастер-класс в корзину');
    }
  };

  return (
    <div className={styles.promo}>
      {notification && <div className={styles.notification}>{notification}</div>}
      <h1>Мастер-класс "Графика"</h1>
      <p>Дорогие друзья!</p>
      <p>Я рада представить вам мой мастер-класс "Графика" по созданию графических композиций в технике экопринт. Этот мастер-класс посвящён искусству создания чётких линий, геометрических patterns и сложных орнаментов на ткани с использованием природных материалов.</p>
      <p>В процессе мастер-класса я поделюсь с вами всеми секретами создания графических работ. Вы научитесь работать с различными типами растений для достижения максимальной выразительности линий и контуров. Я покажу вам пошаговые инструкции и объясню все нюансы, которые будут наглядно продемонстрированы на видео.</p>
      <p>Вместе с мастер-классом вы получите подробный конспект, содержащий техники создания геометрических орнаментов, таблицы сочетаний растений для графических композиций и рецепты протрав для чёрно-белой графики.</p>
      <p>Не важно, новичок вы или опытный мастер - в мастер-классе предусмотрено обучение для разных уровней подготовки. Я гарантирую индивидуальный подход к вашему обучению, готова ответить на все ваши вопросы и помочь вам освоить технику графического экопринта.</p>

      <p><strong>Мастер-класс состоит из:</strong></p>
      <ol>
        <li>Льняная скатерть</li>
        <li>Исправляем ошибки</li>
        <li>Конспекты</li>
        <li>Часто задаваемые вопросы</li>
      </ol>

      <p>Вы освоите создание чётких графических линий, научитесь работать с контрастом и ритмом, создавать симметричные и асимметричные композиции, а также использовать различные растения для достижения максимальной выразительности.</p>

      <div className={styles.gallery}>
        <Slider {...settings} autoPlay={true} autoPlayTime={6000} width="80%" height="700px" images={images}/>
      </div>
      <button className={styles.buyButton} onClick={handleAddToCart}>Купить</button>
    </div>
  );
};

export default GraphicaPromoPage;