import React from "react";
import { useNavigate } from "react-router-dom";
import { IconComment } from "../../../../../assets/icon/index";

import styles from "./commentCount.module.scss";

const CommentCount = ({ comment }) => {
  // const [comment, setComment] = useState(0);
  const navigate = useNavigate();

  const onNavigateCommetDetail = () => {
    navigate("commentDetail");
  };

  return (
    <button className={styles.commentCount} onClick={onNavigateCommetDetail}>
      <IconComment />
      {/* 답글 전체 개수 표시 */}
      <output>답글 {comment}개</output>
    </button>
  );
};

export default CommentCount;
