import React, { useState } from "react";
import { ImStarEmpty, ImStarHalf } from "react-icons/im";

import cx from "classnames";
import styles from "./stars.module.scss";

const stars = Array(5).fill(0);

const Stars = () => {
  const [starIndex, setStarIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(undefined);

  const onClick = (num) => {
    setStarIndex(num);
  };

  const fillStarIndex = (num, event) => {
    if (event === "enter" && hoverIndex >= num) {
      return "#f3c623";
    }
    if (event === "leave" && starIndex >= num) {
      return "#f3c623";
    }
    return <ImStarEmpty color="#f3c623" size="18" />;
  };

  return (
    <output className={styles.starContainer}>
      {stars.map((num, index) => (
        <button
          key={num}
          type="button"
          className={styles.star}
          onClick={onClick(num)}
          onMouseEnter={() => setHoverIndex(num)}
          onMouseLeave={() => setHoverIndex(0)}
        >
          <ImStarHalf
            className={cx(styles.half, { [styles.rightStar]: index % 2 !== 0 })}
            key={"half" + index}
            size="18"
            fill={fillStarIndex(num, hoverIndex === 0 ? "leave" : "enter")}
          />
        </button>
      ))}
      ;
    </output>
  );
};

export default Stars;
