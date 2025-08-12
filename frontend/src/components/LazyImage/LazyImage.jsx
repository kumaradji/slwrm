import React, { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.scss';
import { useImageOptimization } from '../../hooks/useImageOptimization';
import imagePerformanceMonitor from '../../utils/imagePerformance';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/loading_placeholder.jpg',
  onError,
  onClick,
  optimizationOptions = {},
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef();
  
  const { src: optimizedSrc, srcSet } = useImageOptimization(src, optimizationOptions);

  useEffect(() => {
    if (imageRef) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              observerRef.current.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px', // Загружаем изображения за 50px до появления в viewport
          threshold: 0.01
        }
      );

      observerRef.current.observe(imageRef);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (isInView && optimizedSrc) {
      const tracker = imagePerformanceMonitor.trackImage(optimizedSrc);
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(optimizedSrc);
        setIsLoaded(true);
        tracker.onLoad();
      };
      
      img.onerror = () => {
        tracker.onError();
        if (onError) {
          onError();
        } else {
          setImageSrc('/images/fallback_plants.jpg');
        }
      };
      
      img.src = optimizedSrc;
    }
  }, [isInView, optimizedSrc, onError]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`${styles.lazyImage} ${isLoaded ? styles.loaded : ''} ${className}`}
      loading="lazy"
      srcSet={srcSet ? `${srcSet['1x']} 1x, ${srcSet['2x']} 2x, ${srcSet['3x']} 3x` : undefined}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onClick={onClick}
      {...props}
    />
  );
};

export default LazyImage;
