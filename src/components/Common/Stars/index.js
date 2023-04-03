import React, { useState } from "react";
import cx from "classnames";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { FaStarHalf, FaRegStarHalf } from "react-icons/fa";

import styles from "./stars.module.scss";

const Stars = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const onClick = (ratingValue) => {
    return (e) => {
      e.stopPropagation();

      setRating(ratingValue);
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
          <label className={styles.starWrapper}>
            {/* {hover >= ratingValue || rating >= ratingValue ? (
              <ImStarFull />
            ) : (
              <ImStarEmpty />
            )} */}
            {/* //TODO: div css로 조절해서 왼쪽 혹은 오른쪽만 hover/click이 되도록 설정 */}
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
      {/* <FaStarHalf /> */}
    </output>
  );
};
export default Stars;
