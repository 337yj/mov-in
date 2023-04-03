import React, { useState } from "react";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";

import styles from "./stars.module.scss";

const Stars = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <output className={styles.starContainer}>
      {[...Array(5)].map((star, item) => {
        const ratingValue = item + 1;
        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => (setRating = { ratingValue })}
            />
            <ImStarEmpty
              className={styles.star}
              star={hover || rating ? <ImStarFull /> : <ImStarEmpty />}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </output>
  );
};
export default Stars;
