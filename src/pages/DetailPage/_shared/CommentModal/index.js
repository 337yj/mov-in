import React, { useEffect, useState } from "react";
import {
  createReview,
  getMovieMyReview,
  getReviewsMovie,
  updateReviews,
} from "../../../../api/Review";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../state";
import { Modal, Stars, Tag, Button, Toast } from "../../../../components";
import { POINTS, TENSIONS } from "../pointTag";
import styles from "./commentModal.module.scss";
import { msgList } from "../toastMsg";

const CommentModal = ({
  title,
  movie,
  comment,
  isModified,
  modal,
  setModal,
  myComment,
  onGetCommentDetail,
  onGetMovieComments,
}) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState(comment ? comment.content : "");
  const [rating, setRating] = useState(comment ? comment.score : 0);
  const [selectedPoints, setSelectedPoints] = useState(
    comment ? comment?.enjoyPoints : [],
  );
  const [selectedTension, setSelectedTension] = useState(
    comment ? comment?.tensions?.[0] : null,
  );
  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const user = useRecoilValue(userState);

  // const onGetMyComment = async () => {
  //   const response = await getMovieMyReview(id);
  //   if (response.status === 200) {
  //     if (response.data) setMyComment(response.data);
  //   }
  // };

  // const onGetMovieComment = async () => {
  //   try {
  //     const response = await getReviewsMovie(movie?.id);
  //     if (response.status === 200) {
  //       const data = response.data;
  //       setComments(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

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
      toast("loginRequired");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    onClickNotUser();
    const commentData = {
      content,
      score: rating,
      enjoyPoints: selectedPoints.length > 0 ? selectedPoints : null,
      tensions: selectedTension !== null ? [selectedTension] : null,
    };
    if (isModified) {
      await updateReviews(myComment?.id, commentData);
      // CommentDetail > Comment 에서 넘겨옴
      setToastFloat(true);
      toast("modify");
      onGetCommentDetail();
      // CommentList > Comment 에서 넘겨옴
    } else {
      await createReview(movie?.id, commentData);
      setToastFloat(true);
      toast("save");
    }

    await onGetMovieComments();
    setModal((prev) => !prev);
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  return (
    modal && (
      <Modal className={styles.commentModal} title={title} setModal={setModal}>
        <Toast float={toastFloat} children={toastMsg} />
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
                form="reviewForm"
                type="submit"
              >
                수정
              </Button>
            ) : (
              <Button
                className={styles.submitBtn}
                color="primary"
                form="reviewForm"
                type="submit"
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
        </form>
      </Modal>
    )
  );
};

export default CommentModal;
