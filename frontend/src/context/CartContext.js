// CartContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { logToServer } from "../services/logger";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartCount, setCartCount] = useState(0);
  const [purchasedMasterclasses, setPurchasedMasterclasses] = useState([]);

  // Загружаем купленные мастер-классы при инициализации
  const loadPurchasedMasterclasses = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('/api/masterclass/purchased/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPurchasedMasterclasses(data.purchased_masterclasses || []);
        // Сохраняем в localStorage для быстрого доступа
        localStorage.setItem(`purchasedMasterclasses`, JSON.stringify(data.purchased_masterclasses || []));
      }
    } catch (error) {
      logToServer(`Ошибка при загрузке купленных мастер-классов: ${error.message}`, 'error');
    }
  }, []);

  // Функция для отметки мастер-класса как купленного
  const markAsPurchased = useCallback((masterclassId) => {
    setPurchasedMasterclasses(prev => {
      const updated = [...prev, masterclassId];
      localStorage.setItem(`purchasedMasterclasses`, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateCartCount = useCallback((count) => {
    setCartCount(count);
  }, []);

  const addToCart = useCallback(async (item) => {
    const token = localStorage.getItem('token');
    if (!token) {
      logToServer('Токен не найден', 'error');
      return;
    }

    try {
      const response = await fetch('/api/cart/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({product_id: item.id})
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Ошибка при добавлении товара в корзину');
      }

      const cartResponse = await fetch('/api/cart/', {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      if (!cartResponse.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const cartData = await cartResponse.json();
      if (Array.isArray(cartData) && cartData.length > 0 && Array.isArray(cartData[0].items)) {
        updateCartCount(cartData[0].items.length);
      } else {
        logToServer(`Недействительные данные корзины: ${cartData}`, 'error');
      }
    } catch (error) {
      logToServer(`Ошибка при добавлении продукта в корзину: ${error.message}`, 'error');
    }
  }, [updateCartCount]);

  const clearCart = useCallback(() => {
    setCartCount(0);
  }, []);

  // Проверяем, куплен ли мастер-класс
  const isMasterclassPurchased = useCallback((masterclassId) => {
    return purchasedMasterclasses.includes(masterclassId);
  }, [purchasedMasterclasses]);

  return (
    <CartContext.Provider value={{
      cartCount,
      updateCartCount,
      addToCart,
      clearCart,
      purchasedMasterclasses,
      loadPurchasedMasterclasses,
      markAsPurchased,
      isMasterclassPurchased
    }}>
      {children}
    </CartContext.Provider>
  );
};