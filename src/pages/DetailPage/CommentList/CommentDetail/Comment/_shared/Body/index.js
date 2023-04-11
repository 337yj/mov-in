import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import cx from "classnames";
import styles from "./body.module.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  modalState,
  myCommentState,
  userState,
} from "../../../../../../../state";
import { deleteReviews, updateReviews } from "../../../../../../../api/Review";
import CommentModal from "../../../../../movieDetail/_shared/CommentModal";

const CommentBody = ({ className, comment, ...props }) => {
  const [modal, setModal] = useRecoilState(modalState);
  const [myComment, setMyComment] = useRecoilState(myCommentState);
  const user = useRecoilValue(userState);

  const toggleModal = () => setModal((prev) => !prev);
  const isAuthor = comment?.user?.id === user?.id;

  const updateMyComment = async () => {
    await updateReviews(myComment.id, {
      content,
      score: rating,
      enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
      tensions: selectedTension !== null ? [selectedTension] : null,
    });
    setModal(false);
    //NOTE: recoil state도 변경
  };

  const deleteMyComment = async () => {
    await deleteReviews(myComment.id);
    //NOTE: 삭제하고 나서 tab을 초기화 + alert + recoil state도 변경
  };
  // 내가 쓴 리뷰가 있는 곳에서만 myComment.id뜸
  // console.log(myComment);
  // console.log(myComment.id);

  if (!comment) {
    return null;
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <p className={styles.content}>{comment.content}</p>
      {isAuthor && (
        <div className={styles.btnWrapper}>
          <button className={styles.modifyBtn} onClick={toggleModal}>
            <BsPencilSquare className={styles.iconModify} />
          </button>
          <button className={styles.deleteBtn} onClick={deleteMyComment}>
            <BsTrash className={styles.iconDelete} />
          </button>
        </div>
      )}

      <CommentModal
        title={comment.movie?.title}
        comment={comment}
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
};

export default CommentBody;
