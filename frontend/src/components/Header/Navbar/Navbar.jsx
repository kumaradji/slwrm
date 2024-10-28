// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <Link to="/">Главная</Link>
      <Link to="/lessons">Уроки</Link>
      <Link to="/shop">Магазин</Link>
      <Link to="/about">Обо мне</Link>
      <Link to="/gallery">Галерея</Link>
      <Link to="/profile">Личный кабинет</Link>
    </nav>
  );
};

export default Navbar;
