import React, { useState } from "react";
import { HorizontalLine } from "../../../../../components/Common";
import { IconModify, IconDelete } from "../../../../../assets/icon/index";
import LikeCount from "../likeCount";
import CommentCount from "../commnetCount";
import Profile from "../profile";

import styles from "./commentBox.module.scss";
import { useLocation, useNavigate } from "react-router";

const CommentBox = ({ board_id, content, grade, createdAt, ...props }) => {
  const navigate = useNavigate();

  // 입력한 댓글 내용
  const [content, setContent] = useState("");

  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);

  const onNavigateCommnentDetail = () => {
    navigate();
  };

  return (
    <li className={styles.wrapper}>
      <header className={styles.commentHeader}>
        <Profile />
        <div className={styles.grade}>평점★{grade}</div>
      </header>
      <content className={styles.commentContent}>
        <HorizontalLine />
        <div className={styles.comment}>{content}</div>
        <div className={styles.icon}>
          {/* 알림 띄우고 수정 모달로 이동 */}
          <IconModify />
          {/* 알림 띄우고 코멘트 삭제 */}
          <IconDelete />
        </div>
      </content>
      <footer className={styles.commentFooter}>
        <HorizontalLine />
        <div className={styles.footerContent}>
          <div className={styles.count}>
            <LikeCount />
            {/* 코멘트상세페이지로 이동 */}
            <CommentCount onClick={onNavigateCommnentDetail} />
          </div>
          <div className={styles.date}>{createdAt}</div>
        </div>
      </footer>
    </li>
  );
};

export default CommentBox;
