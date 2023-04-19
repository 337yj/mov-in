import React, { memo, useState } from "react";
import cx from "classnames";
import { FaStarHalf, FaRegStarHalf } from "react-icons/fa";

import styles from "./stars.module.scss";

const Stars = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  const onClick = (ratingValue) => {
    return (e) => {
      e.stopPropagation();
      onRatingChange(ratingValue);
    };
  };

  const onMouseEnter = (ratingValue) => {
    return (e) => {
      setHover(ratingValue);
    };
  };

  return (
    <output className={styles.starContainer}>
      {[...Array(5)].map((star, item) => {
        const ratingValue = item + 1;
        const ratingLeft = ratingValue - 0.5;
        const ratingRight = ratingValue;
        return (
          <label className={styles.starWrapper} key={item}>
            <div
              onMouseEnter={onMouseEnter(ratingLeft)}
              onMouseLeave={() => setHover(null)}
              onClick={onClick(ratingLeft)}
              className={cx(styles.star)}
            >
              {hover >= ratingLeft || rating >= ratingLeft ? (
                <FaStarHalf />
              ) : (
                <FaRegStarHalf />
              )}
            </div>
            <div
              onMouseEnter={onMouseEnter(ratingRight)}
              onMouseLeave={() => setHover(null)}
              onClick={onClick(ratingRight)}
              className={cx(styles.star, styles.right)}
            >
              {hover >= ratingRight || rating >= ratingRight ? (
                <FaStarHalf />
              ) : (
                <FaRegStarHalf />
              )}
            </div>
          </label>
        );
      })}
    </output>
  );
};
export default memo(Stars);
