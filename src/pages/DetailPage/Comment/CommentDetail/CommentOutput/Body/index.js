import React from "react";

import { IconModify, IconDelete } from "../../../../../../assets/icon";
//아이콘 수정
import styles from "./body.module.scss";

const CommentBody = ({ content, className, ...props }) => {
  //TODO:알림 띄우고 수정 모달로 이동 기능 추가/알림띄우고 코멘트 삭제 기능 추가

  return (
    <article className={className}>
      <p className={styles.content}>{content}</p>
      <div className={styles.icon}>
        <button>
          <IconModify />
        </button>
        <button>
          <IconDelete />
        </button>
      </div>
    </article>
  );
};

export default CommentBody;
