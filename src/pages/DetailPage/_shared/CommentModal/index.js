import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { createReview, updateReviews } from "../../../../api/Review";
import { Button, Modal, Stars, Tag, Toast } from "../../../../components";
import { userState } from "../../../../state";
import { POINTS, TENSIONS } from "../pointTag";
import { msgList } from "../toastMsg";
import styles from "./commentModal.module.scss";

//NOTE: memo가 의미 없다.
const CommentModal = ({
  title,
  movie,
  comment,
  isModified,
  modal,
  setModal,
  myComment,
  onGetMovieComments,
}) => {
  const user = useRecoilValue(userState);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedTension, setSelectedTension] = useState(null);
  const [previousComment, setPreviousComment] = useState(null);
  //NOTE: 밑의 2개의 state를 recoil로 관리 => CommentModal에서 Toast를 JSX로 넣지 않고, DetailPage에서 관리
  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onRatingChange = useCallback((newRating) => {
    setRating(newRating);
  }, []);

  const onClickPoint = useCallback(
    (name) => {
      if (selectedPoints.includes(name)) {
        setSelectedPoints(selectedPoints.filter((pointId) => pointId !== name));
      } else if (selectedPoints.length < 3) {
        setSelectedPoints([...selectedPoints, name]);
      }
    },
    [selectedPoints],
  );

  const onClickTension = useCallback(
    (name) => {
      setSelectedTension(name);
    },
    [selectedTension],
  );

  const resetCommentForm = () => {
    setContent("");
    setRating(0);
    setSelectedPoints([]);
    setSelectedTension(null);
  };

  //NOTE: useCallback 불필요
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
      // setToastFloat(true);
      // toast("modify");
    } else {
      await createReview(movie?.id, commentData);
      // setToastFloat(true);
      // toast("save");
    }
    await onGetMovieComments();
  };

  const onClickClose = useCallback(() => {
    setModal((prev) => !prev);
  }, []);

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  const onClickSave = useCallback(() => {
    toast("save");
  }, []);

  const onClickModify = useCallback(() => {
    toast("modify");
  }, []);

  useEffect(() => {
    if (isModified) {
      setPreviousComment(comment);
      setContent(comment?.content ?? "");
      setRating(comment?.score ?? 0);
      setSelectedPoints(comment?.enjoyPoints ?? []);
      setSelectedTension(comment?.tensions?.[0] ?? null);
    } else {
      resetCommentForm();
      setPreviousComment(null);
    }
  }, [modal]);

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
        //NOTE: 모달을 끄는 로직을 토스트가 꺼진 후에 실행
        setModal((prev) => !prev);
      }, 2000);
    }
  }, [toastFloat]);

  return (
    modal && (
      <Modal className={styles.commentModal} title={title} setModal={setModal}>
        <Toast children={toastMsg} float={toastFloat} />
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
                onClick={onClickModify}
              >
                수정
              </Button>
            ) : (
              <Button
                className={styles.submitBtn}
                color="primary"
                form="reviewForm"
                type="submit"
                onClick={onClickSave}
              >
                저장
              </Button>
            )}
            <Button
              className={styles.cancelBtn}
              color="secondary"
              onClick={onClickClose}
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
