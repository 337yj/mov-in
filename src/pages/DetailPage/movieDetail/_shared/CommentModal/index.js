import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { createReview } from "../../../../../api/Review";
import { getUsersMe } from "../../../../../api/User";
import { Modal, Stars, Tag, Button, Toast } from "../../../../../components";
import useMe from "../../../../../hooks/useMe";
import { commentsState, userState } from "../../../../../state";
import { POINTS, TENSIONS } from "../constants";
import styles from "./commentModal.module.scss";

const CommentModal = ({ title, movie, comment, modal, setModal }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(null);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedTension, setSelectedTension] = useState(null);
  const [comments, setComments] = useRecoilState(commentsState);
  const [toastFloat, setToastFloat] = useState(false);
  const user = useRecoilValue(userState);

  const onRatingChange = (newRating) => {
    setRating(newRating);
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onClickNotUser = () => {
    if (!user) {
      setToastFloat(true);
      setTimeout(() => {
        setToastFloat(false);
      }, 1500);
      return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        content,
        score: rating,
        enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
        tensions: selectedTension !== null ? [selectedTension] : null,
      });
      await createReview(movie?.id, {
        content,
        score: rating,
        enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
        tensions: selectedTension !== null ? [selectedTension] : null,
      });
      setModal((prev) => !prev);
      console.error("성공");
      // commentsState 업데이트
      setComments((comments) => [
        {
          content,
          score: rating,
          enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
          tensions: selectedTension !== null ? [selectedTension] : null,
        },
        ...comments,
      ]);
    } catch (error) {
      console.error(error, "실패");
    }
  };

  useEffect(() => {
    setContent("");
    setRating(null);
    setSelectedPoints([]);
    setSelectedTension(null);
  }, [modal]);

  const onClickPoint = (name) => {
    if (selectedPoints.includes(name)) {
      setSelectedPoints(selectedPoints.filter((pointId) => pointId !== name));
    } else if (selectedPoints.length < 3) {
      setSelectedPoints([...selectedPoints, name]);
    }
  };

  const onClickTension = (name) => {
    setSelectedTension(name);
  };

  return (
    modal && (
      <Modal className={styles.commentModal} title={title} setModal={setModal}>
        {toastFloat && <Toast>로그인 후 이용 가능합니다.</Toast>}
        <form className={styles.wrapper} id="reviewForm" onSubmit={onSubmit}>
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
                id={point.id}
                text={point.name}
                isSelected={selectedPoints.includes(point.name)}
                isDisabled={
                  selectedPoints.length >= 3 &&
                  !selectedPoints.includes(point.name)
                }
                onClick={() => onClickPoint(point.name)}
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
                isSelected={selectedTension === tension.name}
                onClick={() => onClickTension(tension.name)}
              />
            ))}
          </div>
          <textarea
            className={styles.commentArea}
            name="content"
            placeholder={
              user
                ? "이 작품에 대한 생각을 자유롭게 표현해 주세요."
                : "로그인 후 작성가능합니다."
            }
            value={content}
            onChange={onChange}
          />
          <div className={styles.btnWrapper}>
            <Button
              className={styles.submitBtn}
              color="primary"
              form="reviewForm"
              onClick={onClickNotUser}
            >
              저장
            </Button>
            <Button
              className={styles.cancelBtn}
              color="secondary"
              onClick={() => setModal((prev) => !prev)}
            >
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default CommentModal;
