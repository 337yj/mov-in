import React, {Children, useState} from "react";
import cx from "classnames";
import styles from "../../Tag/TensionTag/tension.module.scss";

const tensionLevel = [
  {
    id: 1,
    level: "낮음",
  },
  {
    id: 2,
    level: "중간",
  },
  {
    id: 3,
    level: "높음",
  },
];

// 하나만 선택 가능..하게 하고싶은데....
const TensionTag = ({className, children}) => {
  const [isSelected, setIsSelected] = useState(false);

  const onSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <>
      <button
        onClick={onSelect}
        type="submit"
        className={cx(styles.tag, {[styles.isSelected]: isSelected})}>
        {children}
      </button>
    </>
  );
};

export default TensionTag;
