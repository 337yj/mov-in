import React from "react";

import { IconModify, IconDelete } from "../../../../../../assets/icon";
//아이콘 수정
import styles from "./body.module.scss";

const CommentBody = ({ content, className = "", ...props }) => {
  // props type 작성

  return (
    <article className={className}>
      <p className={styles.comment}>{content}</p>
      <div className={styles.icon}>

    // NOTE: body태그 사용 X -> section / article
    
      {/* //NOTE: content -> p */}
      {/* //NOTE: output -> 어떤 결과를 표기할 때 쓰는 태그 */}
      {/* //NOTE: div or footer */}

        {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
        <button>
          <IconModify />
        </button>
        {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
        <button>
          <IconDelete />
        </button>
      </div>
    </article>
  );
};

export default CommentBody;
