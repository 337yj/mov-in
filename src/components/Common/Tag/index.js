import React, { useState } from "react";
import cx from "classnames";
import styles from "./tag.module.scss";

//NOTE: type보다는 isSelected를 사용해서 선택이 됐음을 강조.
const Tag = ({ className, children, isSelected, ...props }) => {

  const [isActive, setIsActive] = useState(false);

  const onSelect = () => {
    setIsActive(!isActive);
  };

  return (
    <>
    <button
    onClick={onSelect}
      type="submit"
      className={cx(styles.tag, { [styles.isSelected]: isSelected })}
    >
      {children}
    </button>
    </>
  );
};

export default Tag;
