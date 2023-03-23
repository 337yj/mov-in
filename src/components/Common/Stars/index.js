import React, { useState } from "react";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
// ImStarFull : 꽉찬 별, ImStarEmpty : 빈 별, ImStarHalf : 반쪽 별
import styles from "./stars.module.scss";

const Stars = () => {
  const ARRAY = [0, 1, 2, 3, 4];

  // 초기값은 빈 별5개
  // 숫자별로 보여지는 아이콘이 다르게
  // 1일때
  //

  const [grade, setGrade] = useState([false, false, false, false, false]);

  const starsGrade = (num) => {
    let star = [...grade];
    for (let i = 0; i < 5; i++) {
      star[i] = i <= num ? true : false;
    }
    setGrade(star);
  };

  return (
    <output className={styles.starContainal}>
      <button className={styles.star}>
        {ARRAY.map((el, index) => (
          <ImStarFull
            key={index}
            size="18"
            color="#f3c623"
            onClick={starsGrade}
            className={styles.full}
          />
        ))}
        {ARRAY.map((el, index) => (
          <ImStarEmpty
            key={index}
            size="18"
            color="#f3c623"
            onClick={starsGrade}
            className={styles.empty}
          />
        ))}
        {ARRAY.map((el, index) => (
          <ImStarHalf
            key={index}
            size="18"
            color="#f3c623"
            onClick={starsGrade}
            className={styles.half}
          />
        ))}
      </button>
    </output>
  );
};

/* 18px, 38px 2개의 크기로 사용 가능할까? */

export default Stars;
