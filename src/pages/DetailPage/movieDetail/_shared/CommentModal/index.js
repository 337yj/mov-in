import React, { useState } from "react";
import { Modal, Stars, Tag, Button } from "../../../../../components";
import { POINTS, TENSIONS } from "../constants";
import styles from "./commentModal.module.scss";

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
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedTension, setSelectedTension] = useState(null);

  const onPointSelect = (text) => {
    const isSelected = selectedPoints.includes(text);
    const canSelectMore =
      (!isSelected && selectedPoints.length < 3) || isSelected;
    if (canSelectMore) {
      setSelectedPoints((prevSelectedPoints) =>
        isSelected
          ? prevSelectedPoints.filter((point) => point !== text)
          : [...prevSelectedPoints, text],
      );
    }
  };

  const onSelectTension = (id) => {
    setSelectedTension(id);
  };

  return (
    modal && (
      <Modal
        className={styles.commentModal}
        title={title}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <p>영화를 평가해주세요.</p>
          <div className={styles.ratingWrapper}>
            <Stars rating={rating} onRatingChange={onRatingChange} />
          </div>

          <p>
            어떤 점이 좋았나요?
            <br />
            감상 포인트를 추천해 주세요!
          </p>
          <div className={styles.tagsWrapper}>
            {POINTS.map((point) => (
              <Tag
                className={styles.pointTag}
                key={point.id}
                text={point.name}
                isSelected={selectedPoints.includes(point.name)}
                onSelect={onPointSelect}
                selectedPoints={selectedPoints}
                isDisabled={
                  selectedPoints.length >= 3 &&
                  !selectedPoints.includes(point.name)
                }
              />
            ))}
          </div>
          <p>긴장감 지수를 선택해 주세요.</p>
          <div className={styles.tagsWrapper}>
            {TENSIONS.map((tension) => (
              <Tag
                className={styles.tensionTag}
                key={tension.id}
                id={tension.id}
                text={tension.name}
                onSelect={onSelectTension}
                isSelected={selectedTension === tension.id}
              />
            ))}
          </div>

          <textarea
            className={styles.commentArea}
            id="comment"
            name="comment"
            placeholder="이 작품에 대한 생각을 자유롭게 표현해 주세요."
          />
          <div className={styles.btnWrapper}>
            <Button className={styles.submitBtn} color="primary">
              저장
            </Button>
            <Button className={styles.cancelBtn} color="secondary">
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};
export default CommentModal;
