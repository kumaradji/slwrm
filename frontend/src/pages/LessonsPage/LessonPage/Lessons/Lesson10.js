// Lesson10.js
import React from "react";

const Lesson10 = () => {
  return (
    <div>
      <div>
        <p>Что такое экопринт и как он работает?</p>
        <p>В этом уроке вы узнаете основы техники экопринта - удивительного метода переноса отпечатков растений на ткань.</p>

        <div>
          <video controls>
            <source
              src="/videos/lessons/ecoprint_intro.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Lesson10;