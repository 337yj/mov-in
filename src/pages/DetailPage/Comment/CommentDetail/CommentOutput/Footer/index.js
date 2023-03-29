import React from "react";
import { useNavigate } from "react-router-dom";

import { LikeButton } from "../_shared";
import { IconComment } from "../../../../../../assets/icon";

import styles from "./footer.module.scss";

const CommentFooter = ({ comment, date, className, ...props }) => {
  const navigate = useNavigate();

  const onNavigateCommetDetail = () => {
    navigate("commentDetail");
  };

  return (
    <footer className={styles.wrapper}>
      <output className={styles.count}>
        <LikeButton />
        <button
          type="button"
          className={className}
          onClick={onNavigateCommetDetail}
        >
          <IconComment />
          {/* 답글 전체 개수 표시 */}
          <output>답글 {comment}개</output>
        </button>
      </output>
      <output className={styles.date}>{date}</output>
    </footer>
  );
};

export default CommentFooter;
