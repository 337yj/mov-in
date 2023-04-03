import React from "react";
import { Modal, Stars } from "../../../../components";

const CommentModal = ({
  title,
  movie,
  modal,
  rating,
  setModal,
  setRating,
  onRatingChange,
}) => {
  const onClickModal = () => {
    setModal(!modal);
  };

  return (
    modal && (
      <Modal
        // className={styles.modal}
        title={title}
        onClick={onClickModal}
      >
        <p>영화를 평가해주세요.</p>
        <Stars rating={rating} onRatingChange={onRatingChange} />
        <p>
          어떤 점이 좋았나요?
          <br />
          감상 포인트를 추천해 주세요!
        </p>
      </Modal>
    )
  );
};
export default CommentModal;
