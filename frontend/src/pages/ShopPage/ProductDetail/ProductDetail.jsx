// ProductDetail.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styles from './ProductDetail.module.scss';
import VerticalGallery from '../../../components/VerticalGallery/VerticalGallery';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from "../../../context/AuthContext";
import LightboxModal from '../../../pages/GalleryPage/LightboxModal/LightboxModal';
import { logToServer } from "../../../services/logger";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [isInCart, setIsInCart] = useState(false);
  const [checkingCart, setCheckingCart] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        logToServer(`Ошибка при загрузке продукта: ${error.message}`, 'error');
        setNotification('Не удалось загрузить детали продукта');
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const checkIfInCart = async () => {
      if (!isLoggedIn) {
        setCheckingCart(false);
        return;
      }

      try {
        const response = await fetch('/api/cart/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const cart = Array.isArray(data) ? data[0] : data;

          if (cart && cart.items) {
            const itemInCart = cart.items.some(item => item.id === parseInt(productId));
            setIsInCart(itemInCart);
          }
        }
      } catch (error) {
        logToServer(`Ошибка при проверке корзины: ${error.message}`, 'error');
      } finally {
        setCheckingCart(false);
      }
    };

    checkIfInCart();
  }, [productId, isLoggedIn]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/profile', { state: { from: location.pathname } });
      return;
    }

    if (isInCart) {
      navigate('/cart');
      return;
    }

    addToCart(product);
    setNotification('Товар добавлен в корзину');
    setIsInCart(true);
    setTimeout(() => setNotification(''), 3000);
  };

  const renderContent = (content) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  const handleGoBack = () => {
    navigate('/shop');
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImageIndex(null);
  };

  const getButtonText = () => {
    if (!isLoggedIn) return 'Войти для покупки';
    if (checkingCart) return 'Проверка...';
    if (isInCart) return 'Перейти в корзину';
    return 'Добавить в корзину';
  };

  if (!product) return <div>Загрузка...</div>;

  return (
    <div className={styles.productDetail}>
      <Helmet>
        {/* Запрещаем индексирование страниц товаров */}
        <meta name="robots" content="noindex, follow" />
        <title>{product.title} - ДушуГрею</title>
        <meta name="description" content={`${product.title} - уникальное изделие с экопринтом от ДушуГрею. Цена: ${product.price} руб.`} />

        {/* Канонический URL указывает на главную страницу магазина */}
        <link rel="canonical" href="https://koltsovaecoprint.ru/shop" />
      </Helmet>

      {notification && <div className={styles.notification}>{notification}</div>}
      <div className={styles.productContent}>
        <div className={styles.productImages}>
          {product.images && product.images.length > 0 && (
            <VerticalGallery
              images={product.images}
              onImageClick={openLightbox}
            />
          )}
        </div>

        <div className={styles.productInfo}>
          <h1>{product.title}</h1>
          <div className={styles.productText}>
            {renderContent(product.content)}
            <p className={styles.productPrice}>Цена: {product.price} руб.</p>
          </div>
          <button
            className={`${styles.addToCartButton} ${isInCart ? styles.inCart : ''}`}
            onClick={handleAddToCart}
            disabled={checkingCart}
          >
            {getButtonText()}
          </button>
          <button onClick={handleGoBack} className={styles.backToShopButton}>
            Назад в магазин
          </button>
        </div>
      </div>

      {/* Lightbox for viewing images */}
      {lightboxOpen && (
        <LightboxModal
          images={product.images}
          selectedImageIndex={selectedImageIndex}
          closeLightbox={closeLightbox}
        />
      )}
    </div>
  );
};

export default ProductDetail;