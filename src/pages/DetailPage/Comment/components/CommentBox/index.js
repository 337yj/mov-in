import React from "react";
import { IconModify, IconDelete } from "../../../../../assets/icon";
import LikeCount from "../LikeCount";
import CommentCount from "../CommnetCount";
import Profile from "../Profile";

import styles from "./commentBox.module.scss";

const CommentBox = ({ grade, content, ...props }) => {
  // props type 작성
  return (
    <li className={styles.wrapper}>
      <section className={styles.commentHeader}>
        <Profile />
        <output className={styles.grade}>평점★{grade}</output>
      </section>
      <section className={styles.commentContent}>
        <hr className={styles.HorizontalLine} />
        <content className={styles.comment}>{content}</content>
        <output className={styles.icon}>
          {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
          <IconModify />
          {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
          <IconDelete />
        </output>
      </section>
      <section className={styles.commentFooter}>
        <hr className={styles.HorizontalLine} />
        <content className={styles.footerContent}>
          <output className={styles.count}>
            <LikeCount />
            <CommentCount />
          </output>
          {/* 작성날짜 기능 추가 */}
          <output className={styles.date}></output>
        </content>
      </section>
    </li>
  );
};

export default CommentBox;
