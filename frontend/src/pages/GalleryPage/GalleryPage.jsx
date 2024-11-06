// GalleryPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './GalleryPage.module.scss';
import galleries from './galleries';
import LightboxModal from "./LightboxModal/LightboxModal";

const GalleryPage = () => {
  const navigate = useNavigate();
  const { galleryId } = useParams();
  const gallery = galleries.find(gallery => gallery.id === parseInt(galleryId));
  const { title, description, items } = gallery;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handleGoBack = () => {
    navigate('/gallery');
  };

  return (
    <div className={styles.gallery}>
      <title>ДушуГрею | Галерея фотографий</title>
      <meta name="description" content="Галерея фотографий с изделиями экопринта от ДушуГрею"/>
      <meta name="keywords" content="экопринт, фото, галерея, изделия, ДушуГрею"/>

      <h1>Страница галереи фотографий с изделиями экопринта сайта ДушуГрею</h1>

      <h1>{title}</h1>
      <p className={styles.gallery__description}>{description}</p>
      <div className={styles.gallery__container}>
        {items.map((image, index) => (
          <div key={index} className={styles.gallery__item} onClick={() => openLightbox(index)}>
            <div className={styles.gallery__item_image}>
              <img src={image.src} alt={image.alt}/>
            </div>
          </div>
        ))}
      </div>
      <LightboxModal images={items.map(item => item.src)} selectedImageIndex={selectedImageIndex}
                     closeLightbox={closeLightbox}/>
      <button onClick={handleGoBack} className={styles.backButton}>
        Назад к галерее
      </button>
    </div>
  );
};

export default GalleryPage;
