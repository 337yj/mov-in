import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  BsFillHeartFill,
  BsHeart,
  BsPencilSquare,
  BsStarFill,
  BsTrash,
} from "react-icons/bs";
import styles from "./comment.module.scss";
import { ImageProfile1 } from "../../../../assets";
import { useNavigate } from "react-router-dom";
import CommentModal from "../../_shared/CommentModal";
import { Tag, Toast } from "../../../../components";
import { useRecoilState, useRecoilValue } from "recoil";
import { myCommentState, userState } from "../../../../state";
import {
  createReviewsLike,
  deleteReviews,
  deleteReviewsLike,
} from "../../../../api/Review";
import { TfiCommentAlt } from "react-icons/tfi";

const Comment = ({ comment, profileImage, className, ...props }) => {
  const navigate = useNavigate();
  const [toastFloat, setToastFloat] = useState(false);
  const [modal, setModal] = useState(false);
  const [myComment, setMyComment] = useRecoilState(myCommentState);
  const user = useRecoilValue(userState);
  const [isModified, setIsModified] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment);

  const checkIsLiked = async () => {
    if (user) {
      setIsLiked(comment?.isLiked);
    } else {
      setIsLiked(false);
    }
  };
  const onEditClick = () => {
    setModal(true);
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

  const onClickCommentLike = async (e) => {
    onClickNotUser();
    try {
      if (isLiked) {
        await deleteReviewsLike(comment?.id);
      } else {
        await createReviewsLike(comment?.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(isLiked);
  console.log(comment);

  // useEffect(() => {
  //   setIsLiked(comment?.isLiked);
  // }, [comment]);

  useEffect(() => {
    checkIsLiked();
  }, [comment?.id]);

  const enjoyPoints = comment?.enjoyPoints ? comment?.enjoyPoints : [];
  const tensions = comment?.tensions ? comment?.tensions : [];

  const toggleModal = () => setModal((prev) => !prev);
  const isAuthor = comment?.user?.id === user?.id;

  const onClickModified = () => {
    setIsModified(true);
  };
  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };
  const onClickDelete = async () => {
    await deleteReviews(myComment?.id);
    //NOTE: 삭제하고 나서 tab을 초기화 + alert + recoil state도 변경
    // navigate(`commentList/:${comment.movie.id}`);
    navigate(-1);
    setToastFloat(true);
    setTimeout(() => {
      setToastFloat(false);
    }, 1500);
  };

  useEffect(() => {
    setToastFloat(false); // 페이지 렌더링될 때 toastFloat 초기화
  }, []);

  useEffect(() => {
    if (!comment && toastFloat) {
      setToastFloat(false); // 페이지가 404 에러가 발생했을 때 toastFloat 초기화
    }
  }, [comment, toastFloat]);

  if (!comment) {
    return null;
  }

  return (
    <section className={styles.wrapper} onClick={props.onClick}>
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <img
            src={ImageProfile1}
            alt="userProfileImage"
            className={styles.profileImage}
          />
          <p className={styles.username}>
            {comment.user?.nickname ?? comment.user?.name}
          </p>
          <p className={styles.points}>
            {enjoyPoints?.map((point, index) => (
              <span key={index}>{point}</span>
            ))}
            {tensions?.map((point, index) => (
              <span key={index}>{point}</span>
            ))}
          </p>
        </div>

        <p className={styles.userScore}>
          평점
          <BsStarFill className={styles.star} />
          {/* <span>{comment.score?.toFixed(1)}</span> */}
        </p>
      </div>
      <div
        className={styles.commentBody}
        onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
      >
        {toastFloat && <Toast>코멘트가 삭제되었습니다.</Toast>}
        <p className={styles.content}>{comment.content}</p>
        {isAuthor && (
          <div className={styles.bodyBtnWrapper}>
            <button className={styles.modifyBtn} onClick={onEditClick}>
              <BsPencilSquare className={styles.iconModify} />
            </button>
            <button className={styles.deleteBtn} onClick={onClickDelete}>
              <BsTrash className={styles.iconDelete} />
            </button>
          </div>
        )}

        <CommentModal
          title={comment.movie?.title}
          comment={comment}
          modal={modal}
          isModified={isModified}
          setModal={setModal}
        />
      </div>
      <div className={styles.commentFooter}>
        {toastFloat && <Toast>로그인 후 이용 가능합니다.</Toast>}
        <div className={styles.footerBtnWrapper}>
          <button className={styles.likeBtn} onClick={onClickCommentLike}>
            {isLiked ? (
              <BsFillHeartFill className={styles.IconFillLike} />
            ) : (
              <BsHeart className={styles.IconLike} />
            )}
            <span>좋아요 {comment?.likeCount ?? "0"}개</span>
          </button>
          <button type="button" className={styles.commentBtn}>
            <TfiCommentAlt className={styles.iconReply} />
            <span>댓글 {comment?.comments?.length ?? "0"}개</span>
          </button>
        </div>
        <p className={styles.date}>
          {dayjs(comment?.updatedAt).format("YYYY.MM.DD")}
        </p>
      </div>
    </section>
  );
};

export default Comment;
