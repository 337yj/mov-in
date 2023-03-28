import React, { useState } from "react";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
// ImStarFull : 꽉찬 별, ImStarEmpty : 빈 별, ImStarHalf : 반쪽 별
import styles from "./stars.module.scss";

const Stars = () => {
  const stars = Array(5).fill(0);
  // const activeStars=

  const [starValue, setStarValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setStarValue(value);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <output className={styles.container}>
      <div className={styles.star}>
        {stars.map((_, index) => {
          return index ? (
            <ImStarEmpty key={index} color="#f3c623" size="18" />
          ) : (
            <ImStarFull
              key={index}
              precision={0.5}
              color="#f3c623"
              size="18"
              className={styles.full}
              hover={
                (hoverValue || starValue) > index ? (
                  <ImStarEmpty />
                ) : (
                  <ImStarFull />
                )
              }
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
    </output>
  );
};

export default Stars;
