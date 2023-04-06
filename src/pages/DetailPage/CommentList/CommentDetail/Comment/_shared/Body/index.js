import React from "react";

import { IconModify, IconDelete } from "../../../../../../../assets";
//아이콘 수정
import styles from "./body.module.scss";

//TODO:알림 띄우고 수정 모달로 이동 기능 추가/알림띄우고 코멘트 삭제 기능 추가
//TODO: 리뷰 수정
// export const updateReviews = (id, body) => {
//   return apiClient.patch(`/reviews/${id}`, body);
// };
//TODO: 리뷰 삭제
// export const deleteReviews = (id) => {
//   return apiClient.delete(`/reviews/${id}`);
// };

const CommentBody = ({ className, comment, ...props }) => {
  return (
    <article className={className}>
      <p className={styles.content}>{comment.content}</p>
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
