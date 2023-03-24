import React from "react";
import { IconModify, IconDelete } from "../../../../../../assets/icon";
import { LikeCount, Profile } from "../_shared";
import styles from "./replyOutput.module.scss";

//TODO: Content / Footer 로 Component 분리
const ReplyBox = ({ content, ...props }) => {
  // props type 작성
  return (
    <li className={styles.wrapper}>
      <Profile />

      {/* Content */}
      <section className={styles.replyContent}>
        <contents className={styles.comment}>{content}</contents>
        <output className={styles.icon}>
          {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
          <IconModify />
          {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
          <IconDelete />
        </output>
      </section>
      {/* Footer */}
      <section className={styles.replyFooter}>
        <hr className={styles.HorizontalLine} />
        <contents className={styles.footerContent}>
          <LikeCount />
          {/* 작성날짜 기능 추가 */}
          <output className={styles.date}></output>
        </contents>
      </section>
    </li>
  );
};

export default ReplyBox;