import React from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import cx from "classnames";
import styles from "./body.module.scss";

const CommentBody = ({ className, comment, ...props }) => {
  if (!comment) {
    return null;
  }

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
