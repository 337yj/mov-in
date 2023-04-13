import React, { useEffect, useState } from "react";
import {
  createReview,
  getMovieMyReview,
  updateReviews,
} from "../../../../api/Review";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../state";
import { Modal, Stars, Tag, Button, Toast } from "../../../../components";
import { POINTS, TENSIONS } from "../pointTag";
import styles from "./commentModal.module.scss";
import { useParams } from "react-router-dom";

const CommentModal = ({
  title,
  movie,
  comment,
  isModified,
  modal,
  setModal,
  myComment,
}) => {
  const { id } = useParams();
  const [content, setContent] = useState(comment ? comment.content : "");
  const [rating, setRating] = useState(comment ? comment.score : null);
  const [selectedPoints, setSelectedPoints] = useState(
    comment ? comment?.enjoyPoints : [],
  );
  const [selectedTension, setSelectedTension] = useState(
    comment ? comment?.tensions?.[0] : null,
  );
  // const [myComment, setMyComment] = useState();
  const [toastFloat, setToastFloat] = useState(false);
  const user = useRecoilValue(userState);

  // const onGetMyComment = async () => {
  //   const response = await getMovieMyReview(id);
  //   if (response.status === 200) {
  //     if (response.data) setMyComment(response.data);
  //   }
  // };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onRatingChange = (newRating) => {
    setRating(newRating);
  };

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

  const onClickNotUser = () => {
    if (!user) {
      setToastFloat(true);
      setTimeout(() => {
        setToastFloat(false);
      }, 1500);
      return;
    }
  };

  const onClick = async (e) => {
    e.preventDefault();
    const commentData = {
      content,
      score: rating,
      enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
      tensions: selectedTension !== null ? [selectedTension] : null,
    };
    if (isModified) {
      await updateReviews(myComment?.id, commentData);
    } else {
      await createReview(movie?.id, commentData);
    }
    setModal((prev) => !prev);
  };

  console.log(myComment);
  // console.log(isModified);
  useEffect(() => {
    // setContent(comment ? comment.content : "");
    // setRating(comment ? comment.score : null);
    // setSelectedPoints(comment ? comment?.enjoyPoints : []);
    // setSelectedTension(comment ? comment?.tensions?.[0] : null);
    // onGetMyComment();
  }, []);

  return (
    modal && (
      <Modal className={styles.commentModal} title={title} setModal={setModal}>
        {toastFloat && <Toast>로그인 후 이용 가능합니다.</Toast>}
        <section className={styles.wrapper}>
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
            className={styles.commentContent}
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
            {isModified ? (
              <Button
                className={styles.submitBtn}
                color="primary"
                onClick={onClick}
              >
                수정
              </Button>
            ) : (
              <Button
                className={styles.submitBtn}
                color="primary"
                onClick={onClick}
              >
                저장
              </Button>
            )}
            <Button
              className={styles.cancelBtn}
              color="secondary"
              onClick={() => setModal((prev) => !prev)}
            >
              취소
            </Button>
          </div>
        </section>
      </Modal>
    )
  );
};

export default CommentModal;
