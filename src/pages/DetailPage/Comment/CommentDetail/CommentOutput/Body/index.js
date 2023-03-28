import React from "react";
import { IconModify, IconDelete } from "../../../../../../assets/icon";
//아이콘 수정
import styles from "./body.module.scss";

const CommentBody = ({ content, ...props }) => {
  // props type 작성

  return (
    // NOTE: body태그 사용 X -> section / article
    <body className={styles.commentContent}>
      <hr className={styles.horizontalLine} />

      {/* //NOTE: content -> p */}
      <content className={styles.comment}>{content}</content>
      {/* //NOTE: output -> 어떤 결과를 표기할 때 쓰는 태그 */}
      {/* //NOTE: div or footer */}
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
