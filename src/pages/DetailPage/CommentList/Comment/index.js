import React, { memo, useCallback, useEffect, useState } from "react";
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
import CommentModal from "../../_shared/CommentModal";
import {
  BsFillHeartFill,
  BsHeart,
  BsPencilSquare,
  BsStarFill,
  BsTrash,
  BsBell,
} from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { IconReport, ImageProfile2 } from "../../../../assets";
import * as ProfileImages from "../../../../assets/images/profileImages";
import cx from "classnames";
import styles from "./comment.module.scss";
import { FaRegHandPointRight } from "react-icons/fa";
import ReportModal from "../../_shared/ReportModal";

const Comment = ({
  comment,
  profileImage,
  className,
  onGetCommentDetail,
  onGetMovieComments,
  isPointsView = true,
  isEllipsis = false,
  toast,
  ...props
}) => {
  const navigate = useNavigate();
  const [myComment, setMyComment] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [modal, setModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const enjoyPoints = comment?.enjoyPoints ? comment?.enjoyPoints : [];
  const tensions = comment?.tensions ? comment?.tensions : [];
  const user = useRecoilValue(userState);
  const isAuthor = comment?.user?.id === user?.id;

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };
  const onOpenReportModal = () => {
    setReportModal(true);
  };

  const onCloseReportModal = () => {
    setReportModal(false);
  };

  const onGetMyComment = async () => {
    const response = await getMovieMyReview(comment?.movie?.id);
    if (response.status === 200) {
      if (response.data) setMyComment(response.data);
    }
  };

  const onClickNotUser = () => {
    if (!user) {
      toast("loginRequired");
    }
  };

  const checkIsLiked = async () => {
    if (user) {
      setIsLiked(comment?.isLiked);
    } else {
      setIsLiked(false);
    }
  };

  const onClickCommentLike = useCallback(async () => {
    onClickNotUser();
    try {
      if (isLiked) {
        await deleteReviewsLike(comment?.id);
      } else {
        await createReviewsLike(comment?.id);
      }
      setIsLiked(!isLiked);
      await onGetMovieComments();
    } catch (error) {
      console.error(error);
    }
  }, [isLiked]);

  const onClickDelete = async () => {
    await deleteReviews(comment?.id);
    await onGetMovieComments();
    const currentPathname = window.location.pathname;
    if (currentPathname.startsWith("/commentDetail")) {
      navigate(-1);
    }
    toast("delete");
  };

  const onClickModify = async () => {
    setModal(true);
    setIsModified(true);
    await onGetMovieComments();
  };

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
            src={
              !comment.user?.profileImage ||
              comment.user?.profileImage.includes("Icon")
                ? ImageProfile2
                : Object.entries(ProfileImages).filter(([key, value]) => {
                    return key === comment.user?.profileImage;
                  })[0][1]
            }
            alt="userProfileImage"
            className={styles.profileImage}
            onClick={onClickNavigate(`/userPage/${comment.user?.id}`)}
          />
          <p className={styles.username}>
            {comment.user?.nickname ?? comment.user?.name}
          </p>
          {isPointsView && (
            <p className={styles.points}>
              {enjoyPoints?.map((point, index) => (
                <span key={index}>{point}</span>
              ))}
              {tensions?.map((point, index) => (
                <span key={index}>긴장감 {point}</span>
              ))}
            </p>
          )}
        </div>

        <p className={styles.userScore}>
          평점
          <BsStarFill className={styles.star} />
          <span>{comment.score?.toFixed(1)}</span>
        </p>
      </div>
      <div className={styles.commentBody}>
        <div className={styles.contentWrapper}>
          <p
            className={cx(styles.content, { [styles.ellipsis]: isEllipsis })}
            onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
          >
            {comment?.content}
          </p>
        </div>

        <div className={styles.bodyBtnWrapper}>
          <button className={styles.reportBtn} onClick={onOpenReportModal}>
            <BsBell className={styles.iconReport} />
          </button>
          {isAuthor && (
            <>
              <button className={styles.modifyBtn} onClick={onClickModify}>
                <BsPencilSquare className={styles.iconModify} />
              </button>
              <button className={styles.deleteBtn} onClick={onClickDelete}>
                <BsTrash className={styles.iconDelete} />
              </button>
            </>
          )}
        </div>

        <CommentModal
          title={comment.movie?.title}
          comment={comment}
          modal={modal}
          isModified={isModified}
          setModal={setModal}
          toast={toast}
          myComment={myComment}
          onGetMovieComments={onGetMovieComments}
        />
        <ReportModal
          review={comment}
          modal={reportModal}
          setModal={setReportModal}
        />
      </div>
      <div className={styles.commentFooter}>
        <div className={styles.footerBtnWrapper}>
          <button className={styles.likeBtn} onClick={onClickCommentLike}>
            {isLiked ? (
              <BsFillHeartFill className={styles.IconFillLike} />
            ) : (
              <BsHeart className={styles.IconLike} />
            )}
            <span>좋아요 {comment?.likeCount ?? "0"}</span>
          </button>
          <button
            type="button"
            className={styles.commentBtn}
            onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
          >
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

export default memo(Comment);
