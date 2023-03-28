import React from "react";

import { IconModify, IconDelete } from "../../../../../../assets/icon";
//아이콘 수정
import styles from "./body.module.scss";

const CommentBody = ({ content, className = "", ...props }) => {
  // props type 작성

  return (
    <body className={className}>
      <p className={styles.comment}>{content}</p>
      <div className={styles.icon}>
        {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
        <button>
          <IconModify />
        </button>
        {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
        <button>
          <IconDelete />
        </button>
      </div>
    </body>
  );
};

export default CommentBody;
