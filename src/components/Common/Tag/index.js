import React, { memo, useCallback, useEffect, useState } from "react";
import cx from "classnames";
import styles from "./tag.module.scss";

//NOTE: type보다는 isSelected를 사용해서 선택이 됐음을 강조.
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

  const onActiveClick = useCallback(() => {
    if (isActive) {
      setIsActive(false);
      onClick(id, false);
    } else if (!isDisabled) {
      setIsActive(true);
      onClick(id, true);
    }
  }, [isActive]);

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

// const Tag = ({
//   className,
//   text,
//   id,
//   isSelected,
//   onSelect,
//   isDisabled,
//   selectedPoints = [],
//   ...props
// }) => {
//   const [isActive, setIsActive] = useState(isSelected || false);

//   const onClick = () => {
//     if (!isDisabled) {
//       setIsActive(!isActive);
//       onSelect(id);
//     }
//   };

//   useEffect(() => {
//     setIsActive(isSelected);
//   }, [isSelected]);

//   return (
//     <button
//       disabled={isDisabled}
//       onClick={onClick}
//       type="button"
//       className={cx(styles.tag, className, { [styles.isActive]: isActive })}
//     >
//       {text}
//     </button>
//   );
// };

// export default Tag;
