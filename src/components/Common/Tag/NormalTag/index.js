import cx from "classnames";
import {useEffect, useState} from "react";
import styles from "../../Tag/NormalTag/normal.module.scss";

// 다중 선택 가능
const NormalTag = ({className, children, types, ...props}) => {
  const [points, setPoints] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const onSelect = () => {
    setIsActive(!isActive);
  };

//   const pointList = [
//     {
//       id: 1,
//       tagName: "연출",
//     },
//     {
//       id: 2,
//       tagName: "연기",
//     },
//     {
//       id: 3,
//       tagName: "스토리",
//     },
//     {
//       id: 4,
//       tagName: "영상미",
//     },
//     {
//       id: 5,
//       tagName: "OST",
//     },
//   ];

  return (
    <>
      <button
        onClick={onSelect}
        type="submit"
        className={cx(styles.tag, {[styles.isActive]: isActive})}>{children}</button>
    </>
  );
};

export default NormalTag;
