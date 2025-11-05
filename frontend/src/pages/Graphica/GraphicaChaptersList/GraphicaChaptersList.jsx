// GraphicaChaptersList.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../MarenGarden/ChaptersList/ChaptersList.module.scss';


const GraphicaChaptersList = ({ chapters }) => {
  return (
    <div className={styles.chaptersList}>
      {chapters.map((chapter) => (
        <NavLink
          key={chapter.id}
          to={`/graphica/${chapter.id}`}
          className={({ isActive }) =>
            isActive ? `${styles.chapterLink} ${styles.activeChapter}` : styles.chapterLink
          }
        >
          {chapter.title}
        </NavLink>
      ))}
    </div>
  );
};

export default GraphicaChaptersList;