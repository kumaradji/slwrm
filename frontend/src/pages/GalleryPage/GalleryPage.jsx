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
      <button onClick={handleGoBack} className={styles.backButton}>
        Назад к галерее
      </button>
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
    </div>
  );
};

export default GalleryPage;
