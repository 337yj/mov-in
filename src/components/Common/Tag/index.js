import React, { useEffect, useState } from "react";
import cx from "classnames";
import styles from "./tag.module.scss";

//NOTE: type보다는 isSelected를 사용해서 선택이 됐음을 강조.
const Tag = ({
  className,
  text,
  id,
  isSelected,
  onSelect,
  selectedPoints = [],
  ...props
}) => {
  const [isActive, setIsActive] = useState(isSelected || false);

  const handleClick = () => {
    const canSelectMore = selectedPoints.length < 3 || isActive;
    if (canSelectMore) {
      setIsActive(!isActive);
      onSelect(id);
    } else if (selectedPoints.includes(id)) {
      setIsActive(false);
      onSelect(id);
    }
  };

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  return (
    <button
      onClick={handleClick}
      type="button"
      className={cx(styles.tag, className, { [styles.isActive]: isActive })}
    >
      {text}
    </button>
  );
};

export default Tag;
