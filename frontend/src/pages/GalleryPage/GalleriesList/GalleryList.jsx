// GalleriesList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GalleriesList.module.scss';
import galleries from '../galleries';

const GalleriesList = () => {
  return (
    <div className={styles.galleries}>
      <h1>Галереи фотографий</h1>
      <div className={styles.galleries__container}>
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className={styles.galleries__item}
          >
            <Link to={`/gallery/${gallery.id}`}>
              <h2 className={styles.galleries__item_title}>{gallery.title}</h2>
              <div className={styles.galleries__item_image}>
                <img src={gallery.items[0].src} alt={gallery.items[0].alt} />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleriesList;