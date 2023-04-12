import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../../state";
import {
  createReviewsComments,
  deleteReviewsComments,
  getReviewsDetail,
} from "../../../api/Review";
import { getMovie } from "../../../api/Movie";
import Comment from "../CommentList/Comment";
import Reply from "./Reply";
import { Button } from "../../../components";
import { formatRuntime } from "../_shared/formatRuntime";
import { ImageProfile3 } from "../../../assets";
import styles from "./commentDetail.module.scss";

const CommentDetail = ({ comment, ...props }) => {
  const { id } = useParams();
  const [detailComment, setDetailComment] = useState();
  const [content, setContent] = useState("");
  const [detailMovie, setDetailMovie] = useState();
  const [user, setUser] = useRecoilState(userState);

  const onGetCommentDetail = async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        setDetailComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onSubmit = async () => {
    const commentData = {
      content: content,
    };
    await createReviewsComments(detailComment.id, commentData);
    onGetCommentDetail();
    setContent("");
  };

  const onDelete = async () => {
    await deleteReviewsComments(detailComment.id);
    onGetCommentDetail();
  };

  useEffect(() => {
    onGetCommentDetail();
    // onGetMovieDetail();
  }, [id]);

  // console.log(detailComment.movie.id);
  // const movieId = detailComment.movie.id
  // const onGetMovieDetail = async () => {
  //   try {
  //     const response = await getMovie(movieId);
  //     if (response.status === 200) {
  //       setDetailMovie(response.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //NOTE: return null은 보통 맨 마지막에 위치
  // if (!id) {
  //   return null;
  // }
  // const formattedRuntime = formatRuntime(movie?.runtime || 0);
  return (
    <main>
      <div className={styles.backgroundWrapper}>
        {/* <img
          className={styles.backgroundImg}
          src={detailComment.movie.postImage}
          alt="thumbnail"
        /> */}
        <div className={styles.backgroundGradient} />
      </div>
      <section className={styles.wrapper}>
        <article className={styles.infoWrapper}>
          {/* <div className={styles.title}>
            <h1>{detailComment.title}</h1>
          </div>
          <div className={styles.info}>
            <p>{detailComment.formattedRuntime}</p>
             <p>{detailComment.movie.genres.map((genre) => genre.name).join(", ")}</p>
            <p>
              {dayjs(detailComment.movie.releasedAt, "YYYYMMDD").format(
                "YYYY.MM.DD",
              )}
            </p>
          </div> */}
        </article>
        <article className={styles.detailInfoWrapper}>
          <div className={styles.commentWrapper}>
            <h2>코멘트</h2>
            <div className={styles.innerWrapper}>
              <section className={styles.commentSection}>
                <Comment comment={detailComment} />
              </section>
              <section className={styles.replyInputSection}>
                <form id="replyForm" onSubmit={onSubmit}>
                  {user && (
                    <div className={styles.profileWrapper}>
                      <div className={styles.profile}>
                        <img
                          // src={comment.user.profileImage ?? profileImage}
                          src={ImageProfile3}
                          alt="userProfileImage"
                          className={styles.profileImage}
                        />

                        <p className={styles.username}>
                          {user?.nickname ?? user?.name}
                        </p>
                      </div>

                      <Button type="submit" form="replyForm" color="primary">
                        등록
                      </Button>
                    </div>
                  )}
                  <textarea
                    className={styles.replyInput}
                    name="content"
                    value={content}
                    onChange={onChange}
                    placeholder={
                      user ? "댓글을 작성해주세요." : "로그인 후 작성해주세요."
                    }
                  />
                </form>
              </section>
              <section>
                <ul className={styles.replyWrapper}>
                  {detailComment?.comments?.map((reply) => {
                    return (
                      <li key={reply.id} className={styles.reply}>
                        <Reply
                          reply={reply}
                          onGetCommentDetail={onGetCommentDetail}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default CommentDetail;
