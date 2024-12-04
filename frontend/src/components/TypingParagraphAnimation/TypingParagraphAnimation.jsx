// TypingParagraphAnimation.jsx
import React, { useState, useEffect } from 'react';

const TypingParagraphAnimation = ({ text, speed = 50 }) => {
  const [displayedParagraphs, setDisplayedParagraphs] = useState([]);
  const paragraphs = text.split('\n\n');

  useEffect(() => {
    const animateParagraphs = async () => {
      for (let i = 0; i < paragraphs.length; i++) {
        const paragraph = paragraphs[i];
        let currentText = '';

        for (let j = 0; j <= paragraph.length; j++) {
          currentText = paragraph.slice(0, j);
          setDisplayedParagraphs(prev => {
            const newParagraphs = [...prev];
            newParagraphs[i] = currentText;
            return newParagraphs;
          });

          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    };

    animateParagraphs();
  }, [text, speed]);

  return (
    <div>
      {displayedParagraphs.map((para, index) => (
        <p key={index}>{para}</p>
      ))}
    </div>
  );
};

export default TypingParagraphAnimation;