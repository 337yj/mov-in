import React, { useEffect, useState } from "react";
import { poster1, poster2, poster3 } from "../../../assets/images/poster";
import cx from "classnames";
import styles from "./poster.module.scss";

const data = [{ image: poster1 }, { image: poster2 }, { image: poster3 }];

const Poster = () => {
  const posterArr = data.map((movie) => movie.image);
  const [currentPosterIdx, setCurrentPosterIdx] = useState(0);
  const [poster, setPoster] = useState(posterArr[currentPosterIdx]);
  const [isVisible, setIsVisible] = useState(true);

  const changePoster = () => {
    setIsVisible(false);
    setTimeout(() => {
      let posterIdx = currentPosterIdx + 1;
      if (posterIdx >= posterArr.length) {
        posterIdx = 0;
      }
      setCurrentPosterIdx(posterIdx);
      setPoster(posterArr[posterIdx]);
      setIsVisible(true);
    }, 1000);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      changePoster();
    }, 6000);
    return () => clearInterval(intervalId);
  }, [poster]);

  return (
    <article>
      <img
        key={poster}
        className={cx(
          styles.posterImage,
          isVisible && styles.fadeIn,
          !isVisible && styles.fadeOut,
        )}
        src={poster}
        alt="moviePoster"
      />
    </article>
  );
};

export default React.memo(Poster);
