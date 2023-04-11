import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "../_shared";

import styles from "./reply.module.scss";
import { ImageProfile10 } from "../../../../../../assets";

//TODO:

const Reply = ({
  profileImage,
  reply,
  username,
  content,
  date,
  className,
  ...props
}) => {
  // props type 작성
  return (
    <section className={styles.wrapper}>
      {/* <CommentHeader
        className={styles.grade}
        profileImage={ImageProfile10}
        username={"닉네임"}
      /> */}
      <p>{reply.content}</p>
      <p>{dayjs(reply.updatedAt).format("YYYY.MM.DD")}</p>

      <CommentBody className={styles.content} comment={reply.content} />
      <CommentFooter
        className={styles.comment}
        date={dayjs().format("YYYY.MM.DD")}
      />
    </section>
  );
};

export default Reply;
