import React, { useState } from "react";
import cx from "classnames";
import styles from "./tag.module.scss";

//NOTE: type보다는 isSelected를 사용해서 선택이 됐음을 강조.
const Tag = ({ className, text, isSelected, ...props }) => {

  const [isActive, setIsActive] = useState(false);

  const onSelect = () => {
    setIsActive(!isActive);
  };

  return (
    <>
    <button
    onClick={onSelect}
      type="submit"
      className={cx(styles.tag, { [styles.isActive]: isActive })}
    >
      {text}
    </button>
    </>
  );
};

export default Tag;
