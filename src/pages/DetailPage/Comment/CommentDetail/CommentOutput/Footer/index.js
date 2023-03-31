import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { LikeButton } from "../_shared";
import { IconComment } from "../../../../../../assets/icon";

import styles from "./footer.module.scss";

const CommentFooter = ({ getTotalComment, date, className, ...props }) => {
  const navigate = useNavigate();

  const onNavigateCommentDetail = () => {
    navigate("/commentDetail");
  };

  // useEffect(() => {
  //   const getTotalComment = async () => {
  //     const { data } = await getReviewsCounter();
  //     return data.total;
  //   };
  // });

  //TODO: 댓글 전체 개수 표시/ 작성날짜

  return (
    <footer className={styles.wrapper}>
      <output className={styles.count}>
        <LikeButton />
        <button
          type="button"
          className={className}
          onClick={onNavigateCommentDetail}
        >
          <IconComment />
          <output>답글 {getTotalComment}개</output>
        </button>
      </output>
      <output className={styles.date} date={dayjs().format("YYYY.MM.DD")}>
        {date}
      </output>
    </footer>
  );
};

export default CommentFooter;
