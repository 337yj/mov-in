import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { getMovieMyReview, getReviewsMovie } from "../../../../api/Review";
import { commentModalState, userState } from "../../../../state";
import Comment from "../../CommentList/Comment";
import styles from "./movieComment.module.scss";
import CommentModal from "../../_shared/CommentModal";

const MovieComment = ({ movie, toast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const [myComment, setMyComment] = useState();
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useRecoilState(commentModalState);

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onGetMyComment = async () => {
    const response = await getMovieMyReview(id);
    if (response.status === 200) {
      if (response.data) {
        setMyComment(response.data);
      } else {
        setMyComment(null);
      }
    }
  };

  const onGetMovieComment = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        const data = response.data;
        setComments(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieComment();
    onGetMyComment();
  }, [id]);

  return (
    <section className={styles.wrapper}>
      <h2>코멘트</h2>
      {comments.length > 0 ? (
        <>
          <div className={styles.myComment}>
            {myComment && (
              <Comment
                comment={myComment}
                toast={toast}
                onGetMovieComments={onGetMyComment}
                isEllipsis={true}
              />
            )}
          </div>
          <ul className={styles.commentWrapper}>
            {comments
              .filter((comment) => comment?.user?.id !== user?.id)
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 2)
              .map((comment) => (
                <li key={comment?.id}>
                  <Comment
                    comment={comment}
                    onGetMovieComments={onGetMovieComment}
                    isPointsView={false}
                    isEllipsis={true}
                  />
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p className={styles.noExistComment}>작성된 코멘트가 없습니다.</p>
      )}
      <div className={styles.btnWrapper}>
        <button
          className={styles.moreBtn}
          onClick={onClickNavigate(`/commentList/${id}`)}
        >
          더보기
        </button>
      </div>
      <CommentModal
        movie={movie}
        title={movie.title}
        modal={modal}
        setModal={setModal}
        toast={toast}
        onGetMovieComments={async () => {
          await onGetMovieComment();
          await onGetMyComment();
        }}
      />
    </section>
  );
};

export default MovieComment;
