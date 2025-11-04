// GraphicaContent.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../MarenGarden/MarenGardenContent/MarenGardenContent.module.scss';

const GraphicaContent = ({ graphicaChapters = [] }) => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const currentChapter = graphicaChapters.find((ch) => ch.id === parseInt(chapterId));

  const handleChapterChange = (newChapterId) => {
    navigate(`/graphica/${newChapterId}`);
  };

  const handleGoBack = () => {
    navigate('/graphica');
  };

  if (!currentChapter) {
    return <p>Раздел не найден</p>;
  }

  return (
    <div className={styles.content}>
      {/* Sidebar скрывается на мобильных устройствах */}
      <div className={styles.sidebar}>
        <ol>
          {graphicaChapters.map((chapter) => (
            <li
              key={chapter.id}
              onClick={() => handleChapterChange(chapter.id)}
              className={chapter.id === parseInt(chapterId) ? styles.activeChapter : ''}
            >
              {chapter.title}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.chapterContent}>
        {currentChapter.content}
        <button onClick={handleGoBack} className={styles.backButton}>
          Назад
        </button>
      </div>
    </div>
  );
};

export default GraphicaContent;