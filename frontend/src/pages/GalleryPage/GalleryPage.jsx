// GalleryPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './GalleryPage.module.scss';
import galleries from './galleries';
import LightboxModal from './LightboxModal/LightboxModal';
import { Helmet } from 'react-helmet';

const GalleryPage = () => {
  const navigate = useNavigate();
  const { galleryId } = useParams();
  const gallery = galleries.find(g => g.id === parseInt(galleryId));
  const { title, description, items } = gallery;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const handleGoBack = () => navigate('/gallery');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": title,
    "description": description,
    "image": items.map(img => img.src)
  };

  return (
    <div className={styles.gallery}>
      <Helmet>
        <title>{`ДушуГрею | ${title}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`экопринт, фото, галерея, ${title}, ДушуГрею`} />

        {/* Open Graph */}
        <meta property="og:title" content={`ДушуГрею | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={items[0]?.src} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`ДушуГрею | ${title}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={items[0]?.src} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <h1>{title}</h1>
      <p className={styles.gallery__description}>{description}</p>

      <div className={styles.gallery__container}>
        {items.map((image, index) => (
          <div
            key={index}
            className={styles.gallery__item}
            onClick={() => openLightbox(index)}
          >
            <div className={styles.gallery__item_image}>
              <img src={image.src} alt={image.alt} />
            </div>
          </div>
        ))}
      </div>

      <LightboxModal
        images={items.map(item => item.src)}
        selectedImageIndex={selectedImageIndex}
        closeLightbox={closeLightbox}
      />

      <button onClick={handleGoBack} className={styles.backButton}>
        Назад к галерее
      </button>
    </div>
  );
};

export default GalleryPage;
