import React from "react";
import dayjs from "dayjs";

import {
  CommentHeader,
  CommentBody,
  CommentFooter,
  ReplyOutput,
} from "../../../../pages";
import { Button } from "../../../../components";

import styles from "./commentDetail.module.scss";

const CommentDetail = ({ profileImage, username, ...props }) => {
  return (
    <main>
      <section className={styles.wrapper}>
        {/* <h2>{영화제목}</h2> */}
        <h4>코멘트</h4>
        <p>
          <div>
            <CommentHeader />
            <hr className={styles.horizontalLine}></hr>
            <CommentBody />
            <hr className={styles.horizontalLine}></hr>
            <CommentFooter
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
          <ReplyOutput />
          <ReplyOutput />
          <ReplyOutput />
          <ReplyOutput />
          <ReplyOutput />
          <ReplyOutput />
        </p>
      </section>
    </main>
  );
};

export default CommentDetail;
