import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  createReviewsLike,
  deleteReviews,
  deleteReviewsLike,
  getMovieMyReview,
} from "../../../../api/Review";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../state";
import { Tag, Toast } from "../../../../components";
import CommentModal from "../../_shared/CommentModal";
import {
  BsFillHeartFill,
  BsHeart,
  BsPencilSquare,
  BsStarFill,
  BsTrash,
} from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { ImageProfile1 } from "../../../../assets";
import styles from "./comment.module.scss";

const Comment = ({
  comment,
  profileImage,
  className,
  onGetCommentDetail,
  onGetReviewsMovie,
  ...props
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [review, setReview] = useState({});
  const [myComment, setMyComment] = useState();
  const [modal, setModal] = useState(false);
  const [toastFloat, setToastFloat] = useState(false);
  const enjoyPoints = comment?.enjoyPoints ? comment?.enjoyPoints : [];
  const tensions = comment?.tensions ? comment?.tensions : [];
  const user = useRecoilValue(userState);

  const isAuthor = comment?.user?.id === user?.id;

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const checkIsLiked = async () => {
    if (user) {
      setIsLiked(comment?.isLiked);
    } else {
      setIsLiked(false);
    }
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

  const onClickCommentLike = async () => {
    onClickNotUser();
    try {
      if (isLiked) {
        await deleteReviewsLike(comment?.id);
        onGetCommentDetail();
      } else {
        await createReviewsLike(comment?.id);
        onGetCommentDetail();
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const onEditClick = () => {
    setModal(true);
    setIsModified(true);
  };

  const onClickDelete = async () => {
    await deleteReviews(comment?.id);
    const currentPathname = window.location.pathname;
    console.log({ currentPathname });
    if (currentPathname.startsWith("/commentDetail")) {
      //NOTE: 삭제 이후에는 404에러 발생
      // onGetCommentDetail();
      navigate(-1);
    }
    onGetReviewsMovie();
  };

  const onGetMyComment = async () => {
    const response = await getMovieMyReview(comment?.movie?.id);
    if (response.status === 200) {
      if (response.data) setMyComment(response.data);
    }
  };
  console.log(myComment);
  useEffect(() => {
    setIsLiked(review.isLiked);
  }, [review]);

  useEffect(() => {
    checkIsLiked();
    onGetMyComment();
  }, [comment?.id]);

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
      <div className={styles.commentBody}>
        {/* <Toast float={toastFloat}>코멘트가 삭제되었습니다.</Toast> */}
        <p
          className={styles.content}
          onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
        >
          {comment.content}
        </p>
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
          myComment={myComment}
        />
      </div>
      <div className={styles.commentFooter}>
        {/* {toastFloat && <Toast>로그인 후 이용 가능합니다.</Toast>} */}
        <div className={styles.footerBtnWrapper}>
          <button className={styles.likeBtn} onClick={onClickCommentLike}>
            {isLiked ? (
              <BsFillHeartFill className={styles.IconFillLike} />
            ) : (
              <BsHeart className={styles.IconLike} />
            )}
            <span>좋아요 {comment?.likeCount ?? "0"}</span>
          </button>
          <button type="button" className={styles.commentBtn}>
            <TfiCommentAlt className={styles.iconReply} />
            <span>댓글 {comment?.comments?.length ?? "0"}</span>
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
