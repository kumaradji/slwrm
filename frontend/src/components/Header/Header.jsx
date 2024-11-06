// Header.jsx
import React, {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import UserBlock from './UserBlock/UserBlock';
import {useAuth} from '../../context/AuthContext';
import styles from './Header.module.scss';
import useWindowSize from '../../hooks/useWindowSize';
import logo_black from '../../assets/logo_DushuGreu_black.png';
import burger_menu_icon from '../../assets/icons/burger_menu_icon.png';
import close_icon from '../../assets/icons/close_icon.png';
import Telegram from '../../assets/icons/telegram_icon.png';
import Whatsapp from '../../assets/icons/whatsapp_icon.png';
import Telephone from '../../assets/icons/telephone_icon.png';
import Email from '../../assets/icons/email_icon.png';
import VK from '../../assets/icons/vk_icon.png';

const Header = () => {
  const {isLoggedIn, user} = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const {width} = useWindowSize();
  const isMobile = width <= 767;
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const handleLoginClick = () => {
    navigate('/auth');
    if (isMobile) {
      closeMenu();
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isMobile) {
      closeMenu();
    }
  };

  // Функция для обработки навигации
  const handleNavigate = () => {
    if (isMobile) {
      closeMenu();
    }
  };

  return (
    <header className={isMenuVisible && isMobile ? styles.menuVisible : ''}>
      <div className={styles.headerContent}>
        <div className={styles.headerLogo}>
          <a>
            <img
              src={logo_black}
              alt="Logo ДушуГрею"
              onClick={handleLogoClick}
              className={styles.headerLogo}
            />
          </a>
        </div>

        {!isMobile && <Navbar closeMenu={closeMenu}/>}
        <div className={`${styles.rightSection} ${isMobile ? styles.hideOnMobile : ''}`}>
          {isLoggedIn && user ? (
            <UserBlock
              userName={user.username}
              userPicture={user.picture}
              setMode={setMode}
              onNavigate={handleNavigate}
            />
          ) : (
            location.pathname !== '/auth' && (
              <button className={styles.loginButton} onClick={handleLoginClick}>
                Войти
              </button>
            )
          )}
        </div>
        {isMobile && (
          <>
            {isMenuVisible ? (
              <img src={close_icon}
                   alt="Close"
                   onClick={closeMenu}
                   className={styles.headerCloseMenuIcon}
              />
            ) : (
              <img src={burger_menu_icon}
                   alt="Menu"
                   onClick={openMenu}
                   className={styles.headerMenuIcon}
              />
            )}
          </>
        )}
      </div>
      {isMenuVisible && isMobile && (
        <div className={styles.dropdownMenuPage}>
          <div className={styles.userBlockWrapper}>
            {isLoggedIn && user ? (
              <UserBlock
                userName={user.username}
                userPicture={user.picture}
                setMode={setMode}
                onNavigate={handleNavigate}
              />
            ) : null}
          </div>
          <Navbar closeMenu={closeMenu}/>
          <div className={styles.footer__social}>
            <a href="https://t.me/nina_koltsova" onClick={handleNavigate}>
              <img src={Telegram} alt="Telegram"/>
            </a>
            <a href="https://vk.com/ecoprint_koltsova" onClick={handleNavigate}>
              <img src={VK} alt="VK"/>
            </a>
            <a href="https://wa.me/79500423593" onClick={handleNavigate}>
              <img src={Whatsapp} alt="Whatsapp"/>
            </a>
            <a href="tel:+79500423593" onClick={handleNavigate}>
              <img src={Telephone} alt="Telephone"/>
            </a>
            <a href="mailto:koltsovaecoprint@yandex.ru" onClick={handleNavigate}>
              <img src={Email} alt="Email"/>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;