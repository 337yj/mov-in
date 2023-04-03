import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "./Comment/_shared";
import { Reply } from "../../../../pages";
import { Button } from "../../../../components";

import styles from "./commentDetail.module.scss";

const CommentDetail = ({ movie, profileImage, username, ...props }) => {
  return (
    <article>
      <h2>코멘트</h2>
      <section className={styles.wrapper}>
        <p>
          <div>
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
          <hr className={styles.horizontalLine}></hr>
          <div>
            <figure className={styles.profile}>
              <img src={profileImage} alt="" className={styles.profileImage} />
              <figcaption className={styles.username}>{username}</figcaption>
            </figure>
            <Button />
            <input></input>
          </div>
          <hr className={styles.horizontalLine}></hr>
          <Reply movie={movie} />
        </p>
      </section>
    </article>
  );
};

export default CommentDetail;
