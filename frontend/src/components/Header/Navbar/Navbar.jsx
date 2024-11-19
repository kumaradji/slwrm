// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.scss';

const Navbar = ({ closeMenu }) => {
  return (
    <nav className={style.navbar}>
      <Link to="/" onClick={closeMenu}>Главная</Link>
      <Link to="/lessons" onClick={closeMenu}>Статьи</Link>
      <Link to="/shop" onClick={closeMenu}>Магазин</Link>
      <Link to="/about" onClick={closeMenu}>Обо мне</Link>
      <Link to="/gallery" onClick={closeMenu}>Галерея</Link>
      <Link to="/profile" onClick={closeMenu}>Личный кабинет</Link>
    </nav>
  );
};

export default Navbar;
