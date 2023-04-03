import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "./Comment/_shared";
import { Reply } from "../../../../pages";
import { Button } from "../../../../components";

import styles from "./commentDetail.module.scss";

const CommentDetail = ({ movie, profileImage, username, ...props }) => {
  const [comment, setComment] = useState();

  const onGetMovieReview = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    onGetMovieReview();
  }, [id]);

  if (!comment) {
    return null;
  }

  return (
    <article>
      <h2>코멘트</h2>
      <section className={styles.wrapper}>
        <div className={styles.myComment}>
          <CommentHeader movie={movie} />
          <hr className={styles.horizontalLine}></hr>
          <CommentBody movie={movie} />
          <hr className={styles.horizontalLine}></hr>
          <CommentFooter
            movie={movie}
            className={styles.comment}
            date={dayjs().format("YYYY.MM.DD")}
          />
        </div>
        {/* <hr className={styles.horizontalLine}></hr> */}
        <div className={styles.replyInput}>
          <figure className={styles.profile}>
            <img src={profileImage} alt="" className={styles.profileImage} />
            <figcaption className={styles.username}>{username}</figcaption>
          </figure>
          <Button className={styles.primary} />
          <input></input>
        </div>
        {/* <hr className={styles.horizontalLine}></hr> */}
        <ul className={styles.replyList}>
          {comment.map((movie) => (
            <li>
              <Reply movie={movie} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default CommentDetail;
