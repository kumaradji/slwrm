// Loader.jsx
import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.loaderContainer}>
    <div className={styles.spinner}></div>
    <p>Загрузка...</p>
  </div>
);

export default Loader;
