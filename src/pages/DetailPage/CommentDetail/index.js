import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastFloatState, toastMsgState, userState } from "../../../state";
import { createReviewsComments, getReviewsDetail } from "../../../api/Review";
import { msgList } from "../_shared/toastMsg";
import Comment from "../CommentList/Comment";
import Reply from "./Reply";
import { Button, Toast } from "../../../components";
import { formatRuntime } from "../_shared/formatRuntime";
import { ImageProfile2 } from "../../../assets";
import * as ProfileImages from "../../../assets/images/profileImages";
import dayjs from "dayjs";
import styles from "./commentDetail.module.scss";

const CommentDetail = ({ comment, ...props }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detailComment, setDetailComment] = useState();
  const [content, setContent] = useState("");
  const [toastFloat, setToastFloat] = useRecoilState(toastFloatState);
  const [toastMsg, setToastMsg] = useRecoilState(toastMsgState);
  const user = useRecoilValue(userState);
  const formattedRuntime = formatRuntime(detailComment?.movie?.runtime || 0);

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onGetCommentDetail = useCallback(async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        setDetailComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const onChange = (e) => {
    const { value } = e.currentTarget;
    setContent(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      content: content,
    };
    await createReviewsComments(detailComment.id, commentData);
    onGetCommentDetail();
    setContent("");
    toast("save");
  };

  useEffect(() => {
    onGetCommentDetail();
  }, [id]);

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  return (
    <main>
      <Toast children={toastMsg} float={toastFloat} />
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.backgroundImg}
          src={detailComment?.movie?.postImage}
          alt="thumbnail"
        />
        <div className={styles.backgroundGradient} />
      </div>
      <section className={styles.wrapper}>
        <article className={styles.infoWrapper}>
          <div
            className={styles.title}
            onClick={onClickNavigate(`/detail/${detailComment?.movie?.id}`)}
          >
            <h1>{detailComment?.movie?.title}</h1>
          </div>
          <div className={styles.info}>
            <p>{formattedRuntime}</p>
            <p>
              {detailComment?.movie?.genres
                .map((genre) => genre.name)
                .join(", ")}
            </p>
            <p>
              {dayjs(detailComment?.movie?.releasedAt, "YYYYMMDD").format(
                "YYYY.MM.DD",
              )}
            </p>
          </div>
        </article>
        <article className={styles.detailInfoWrapper}>
          <div className={styles.commentWrapper}>
            <h2>코멘트</h2>
            <div className={styles.innerWrapper}>
              <section className={styles.commentSection}>
                <Comment
                  comment={detailComment}
                  toast={toast}
                  onGetMovieComments={onGetCommentDetail}
                />
              </section>
              <section className={styles.replyInputSection}>
                <form id="replyForm" onSubmit={onSubmit}>
                  {user && (
                    <div className={styles.profileWrapper}>
                      <div className={styles.profile}>
                        <img
                          // src={comment.user.profileImage ?? profileImage}
                          src={
                            user?.profileImage
                              ? Object.entries(ProfileImages).filter(
                                  ([key, value]) => {
                                    return key === user?.profileImage;
                                  },
                                )[0][1]
                              : ImageProfile2
                          }
                          alt="userProfileImage"
                          className={styles.profileImage}
                          onClick={onClickNavigate(`/myPage`)}
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
                          toast={toast}
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
