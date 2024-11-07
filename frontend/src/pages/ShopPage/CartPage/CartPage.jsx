// CartPage.jsx
import React, {useEffect, useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './CartPage.module.scss';
import {CartContext} from '../../../context/CartContext';
import {logToServer} from "../../../services/logger";
import Loader from '../../../components/Loader/Loader';
import {Helmet} from 'react-helmet';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingItems, setDeletingItems] = useState(new Set());
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const {updateCartCount, clearCart} = useContext(CartContext);
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/cart/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Не удалось загрузить корзину');
      }
      const data = await response.json();
      setCart(Array.isArray(data) ? data[0] : data);
      updateCartCount(Array.isArray(data) ? data[0].items.length : data.items.length);
    } catch (error) {
      logToServer(`Ошибка при загрузке корзины: ${error.message}`, 'error');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('agreementChecked');
    clearCart();
    navigate('/');
  };

  useEffect(() => {
    fetchCart();

    const handleStorageChange = (event) => {
      if (event.key === 'token' && !event.newValue) {
        handleLogout();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const removeFromCart = async (itemId) => {
    setDeletingItems(prev => new Set([...prev, itemId]));
    try {
      const response = await fetch(`/api/cart/remove/${itemId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить товар из корзины');
      }

      // Простая перезагрузка страницы вместо обновления состояния
      window.location.reload();

    } catch (error) {
      logToServer(`Ошибка при удалении товара из корзины: ${error.message}`, 'error');
      setError('Не удалось удалить товар. Попробуйте еще раз.');
    } finally {
      setDeletingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };


  if (loading || refreshing) {
    return <Loader/>;
  }

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice;
    }, 0).toFixed(2);
  };

  const handleAgreementChange = (event) => {
    setIsAgreementChecked(event.target.checked);
  };

  const handleGoBack = () => {
    navigate('/shop');
  };

  const handleCheckout = () => {
    if (isAgreementChecked) {
      localStorage.setItem('agreementChecked', 'true');
      navigate('/payment-instructions', {state: {totalAmount: calculateTotal()}});
    }
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.error}>
          <p>Ошибка: {error}</p>
          <button onClick={fetchCart} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <div className={styles.emptyCart}>
          <h1>Ваша корзина пуста</h1>
          <h3>Добавьте товары в корзину, </h3>
          <h3>чтобы оформить заказ</h3>
          <br/>
          <Link to="/shop" className={styles.continueShopping}>
            Продолжить покупки
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <Helmet>
        <title>ДушуГрею | Корзина пользователя</title>
        <meta name="description" content="Магазин с изделиями экопринта от ДушуГрею"/>
        <meta name="keywords" content="экопринт, красота, природа, ткани, товары, купить, изделия, ДушуГрею"/>
      </Helmet>

      <h1>Корзина</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartSummary}>
          <div className={styles.summaryLeft}>
            <div className={styles.totalPrice}>Товаров на сумму: {calculateTotal()} руб.</div>
            <div className={styles.totalItems}>Количество товаров: {cart.items.length} шт.</div>
          </div>
          <div className={styles.summaryRight}>
            <button
              className={styles.checkoutButton}
              disabled={!isAgreementChecked || deletingItems.size > 0}
              onClick={handleCheckout}
            >
              Перейти к оформлению
            </button>
            <div className={styles.agreement}>
              <label className={styles.agreementLabel}>
                <div className={styles.checkboxWrapper}>
                  <input
                    type="checkbox"
                    checked={isAgreementChecked}
                    onChange={handleAgreementChange}
                    className={styles.hiddenCheckbox}
                  />
                  <div className={styles.customCheckbox}></div>
                </div>
                <span className={styles.agreementText}>
                  Продолжая оформление, я соглашаюсь с{' '}
                  <Link
                    className={styles.offerLink}
                    to="/offer-agreement"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    договором оферты
                  </Link>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.cartItems}>
          {cart.items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div className={styles.cartItemImage}>
                <Link to={`/product/${item.id}`}>
                  {item.images && item.images.length > 0 ? (
                    <img
                      src={item.images[0].image}
                      alt={item.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100';
                      }}
                    />
                  ) : (
                    <img src='https://via.placeholder.com/100' alt={item.title}/>
                  )}
                </Link>
              </div>
              <div className={styles.cartItemDetails}>
                <h2>{item.title}</h2>
                <div className={styles.cartItemPrice}>
                  <p>Цена: {item.price} руб.</p>
                  <button
                    className={`${styles.removeButton} ${deletingItems.has(item.id) ? styles.removing : ''}`}
                    onClick={() => removeFromCart(item.id)}
                    disabled={deletingItems.has(item.id)}
                  >
                    {deletingItems.has(item.id) ? <Loader/> : 'Удалить'} {/* Показать Loader при удалении товара */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleGoBack}
        className={styles.backButton}
        disabled={deletingItems.size > 0}
      >
        Назад в магазин
      </button>
    </div>
  );
};

export default CartPage;
