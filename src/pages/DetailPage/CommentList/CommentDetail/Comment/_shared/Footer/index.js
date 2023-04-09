import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { LikeButton } from "../index";
import { TfiCommentAlt } from "react-icons/tfi";

import styles from "./footer.module.scss";

const CommentFooter = ({ className, comment, ...props }) => {
  const navigate = useNavigate();

  const onNavigateCommentDetail = () => {
    navigate("/commentDetail");
  };
  // console.log(comment);
  // 윤 - output 요소는 결과를 출력하기 위해 사용되는 요소로,
  // 특히 <form> 요소 내의 input, select, textarea 요소 등과 함께 사용한다고 하네
  // 영화 리뷰 카드의 하단 부분에서는 단순히 정보를 표시하고 있으므로 div, p태그로 구분하는게 적절할거같아
  if (!comment) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <LikeButton />
        <button
          type="button"
          className={styles.commentBtn}
          onClick={onNavigateCommentDetail}
        >
          <TfiCommentAlt className={styles.iconReply} />
          <span>댓글 {comment.comments.length}개</span>
        </button>
      </div>
      <p className={styles.date}>
        {dayjs(comment.updatedAt).format("YYYY.MM.DD")}
      </p>
    </div>
  );
};

export default CommentFooter;
