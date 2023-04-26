import React, { memo, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import styles from "./tag.module.scss";

const Tag = ({
  className,
  id,
  text,
  isSelected,
  isDisabled,
  onClick,
  ...props
}) => {
  const [isActive, setIsActive] = useState(isSelected || false);

  const onActiveClick = () => {
    if (isActive) {
      setIsActive(false);
      onClick(id, false);
    } else if (!isDisabled) {
      setIsActive(true);
      onClick(id, true);
    }
  };

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  return (
    <button
      disabled={isDisabled}
      onClick={onActiveClick}
      type="button"
      className={cx(styles.tag, className, { [styles.isActive]: isActive })}
    >
      {text}
    </button>
  );
};

export default memo(Tag);
