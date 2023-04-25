import React, { useEffect, useState } from "react";

import { getReviewsDetail, deleteAdminReviews } from "../../../../api/Review";

import Comment from "../../../DetailPage/CommentList/Comment";
import { Modal, Button, Stars } from "../../../../components";

import styles from "./boCommentModal.module.scss";

import { ImageProfile2 } from "../../../../assets/images/profileImages";
import { useNavigate } from "react-router-dom";

const BoMovieModal = ({ userId, reviewId, modal, onCloseModal }) => {
  const [review, setReview] = useState(null);

  const navigate = useNavigate();

  const onClickModal = () => {
    onCloseModal();
    setReview(null);
  };

  const onClickToDetail = () => {
    navigate(`/detail/${review?.movie.id}`)
  }

  const onGetCommentDetail = async () => {
    try {
      const response = await getReviewsDetail(reviewId);
      if (response.status === 200) {
        setReview(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    await deleteAdminReviews(reviewId);
    alert("삭제되었습니다.");
  };

  useEffect(() => {
    onGetCommentDetail();
  }, [reviewId]);

  if (!review) {
    return null;
  }

  return (
    modal && (
      <Modal
        className={styles.boCommentModal}
        user={review.user}
        review={review}
        title={"코멘트 관리"}
        subTitle={"코멘트를 관리할 수 있습니다"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.content}>
            <h1 onClick={onClickToDetail}>{review?.movie.title}</h1>
            <Comment
              comment={review}
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
            <Button
              className={styles.cancel}
              color={"secondary"}
              onClick={onClickModal}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;
