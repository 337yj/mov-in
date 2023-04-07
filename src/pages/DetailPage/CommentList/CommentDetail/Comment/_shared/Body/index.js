import React from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import cx from "classnames";
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
  // console.log(comment.content);
  // console.log(comment);
  return (
    <div className={cx(styles.wrapper, className)}>
      <p className={styles.content}>{comment.content}</p>
      {/* btnWrapper는 현재 로그인한 유저가 쓴 코멘트에만 보이도록 */}
      <div className={styles.btnWrapper}>
        <button className={styles.modifyBtn}>
          <BsPencilSquare className={styles.iconModify} />
        </button>
        <button className={styles.deleteBtn}>
          <BsTrash className={styles.iconDelete} />
        </button>
      </div>
    </div>
  );
};

export default CommentBody;
