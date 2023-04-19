import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getReviewsDetail, deleteReviews } from "../../../../api/Review";
import Comment from "../../../DetailPage/CommentList/Comment";
import { Modal, Button } from "../../../../components";

import styles from "./boCommentModal.module.scss";

const BoMovieModal = ({ userId, commentId, modal, onCloseModal }) => {
  const [id] = useParams;

  const [comment, setComment] = useState([]);
  const [user, setUser] = useState(null);

  const onClickModal = () => {
    onCloseModal();
    setComment(null);
  };

  const onGetCommentDetail = async () => {
    try {
      const response = await getReviewsDetail(commentId);
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetUserDetail = async () => {
    try {
      const response = await getReviewsDetail(userId);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    await deleteReviews(id);
    alert("삭제되었습니다.");
  };

  useEffect(() => {
    onGetCommentDetail();
    onGetUserDetail();
  }, [commentId]);

  if (!comment) {
    return null;
  }

  return (
    modal && (
      <Modal
        className={styles.boCommentModal}
        user={user}
        review={comment}
        title={"코멘트 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.content}>
            <figure className={styles.profile}>
              <img
                src={user.profileImage}
                alt="profileImage"
                className={styles.profileImage}
              />
              <figcaption className={styles.username}>
                {user.nickname}
              </figcaption>
              <Stars />
              <Tag className={styles.pointTag} />
              <Tag className={styles.tensionTag} />
            </figure>
            <Comment
              comment={comment.comment}
              className={styles.comment}
              onGetCommentDetail={onGetCommentDetail}
            />
          </section>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.delete}
              color={"primary"}
              onClick={onClickDelete}
            >
              삭제
            </Button>
            <Button className={styles.cancel} color={"secondary"}>
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;
