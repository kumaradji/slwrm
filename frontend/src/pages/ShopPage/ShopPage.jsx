// ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ShopPage.module.scss';
import { logToServer } from "../../services/logger";
import Loader from '../../components/Loader/Loader';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("все категории");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Показать индикатор загрузки
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/products/'),
          fetch('/api/categories/')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        logToServer(`Ошибка при получении данных: ${error.message}`, 'error');
      } finally {
        setIsLoading(false); // Скрыть индикатор загрузки
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    setSelectedCategoryName(categoryName || "все категории");
    setIsBurgerMenuOpen(false);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className={styles.shopContainer}>
      {/* Десктопное меню категорий */}
      <div className={styles.categoriesWrapper}>
        <div className={styles.categoriesContainer}>
          <ul>
            {categories
              .filter(category => category.id !== 6)
              .map(category => (
                <li key={category.id}>
                  <button
                    className={selectedCategory === category.id ? styles.activeCategory : ''}
                    onClick={() => handleCategoryClick(category.id, category.name)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            <br />
            <li>
              <button
                className={selectedCategory === null ? styles.activeCategory : ''}
                onClick={() => handleCategoryClick(null, "все категории")}
              >
                все категории
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Мобильное меню категорий */}
      <div className={styles.mobileMenu}>
        <button
          className={styles.categoryButton}
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        >
          {selectedCategoryName}
          <span className={`${styles.arrow} ${isBurgerMenuOpen ? styles.arrowUp : ''}`}>▼</span>
        </button>

        {isBurgerMenuOpen && (
          <div className={styles.categoryDropdown}>
            <div className={styles.dropdownHeader}>
              <span>Категория</span>
              <button
                className={styles.closeButton}
                onClick={() => setIsBurgerMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className={styles.categoryList}>
              <li>
                <button
                  className={selectedCategory === null ? styles.activeCategory : ''}
                  onClick={() => handleCategoryClick(null)}
                >
                  все категории
                </button>
              </li>
              {categories
                .filter(category => category.id !== 6)
                .map(category => (
                  <li key={category.id}>
                    <button
                      className={selectedCategory === category.id ? styles.activeCategory : ''}
                      onClick={() => handleCategoryClick(category.id, category.name)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
            </ul>
            <button
              className={styles.doneButton}
              onClick={() => setIsBurgerMenuOpen(false)}
            >
              Готово
            </button>
          </div>
        )}
      </div>

      {/* Контейнер с товарами */}
      <div className={styles.productsContainer}>
        <div className={styles.productsGrid}>
          {isLoading ? (
            <Loader />
          ) : Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
              >
                <Link to={`/product/${product.id}`}>
                  <div className={styles.productImage}>
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.title} onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100';
                      }}/>
                    ) : (
                      <img src='https://via.placeholder.com/100' alt={product.title}/>
                    )}
                  </div>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productPrice}>Цена: {product.price} руб.</p>
                  <button className={styles.productButton}>ПОДРОБНЕЕ</button>
                </Link>
              </div>
            ))
          ) : (
            <h2 className={styles.productNot}>Нет доступных товаров</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
