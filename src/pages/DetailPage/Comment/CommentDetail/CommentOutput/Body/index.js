import React from "react";
import { IconModify, IconDelete } from "../../../../../../assets/icon";
//아이콘 수정
import styles from "./body.module.scss";

const CommentBody = ({ content, ...props }) => {
  // props type 작성

  return (
    <body className={styles.commentContent}>
      <hr className={styles.horizontalLine} />
      <content className={styles.comment}>{content}</content>
      <output className={styles.icon}>
        {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
        <IconModify />
        {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
        <IconDelete />
      </output>
    </body>
  );
};

export default CommentBody;
