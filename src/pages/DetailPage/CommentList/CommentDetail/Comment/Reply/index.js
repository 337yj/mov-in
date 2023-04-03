import React from "react";
import dayjs from "dayjs";

import { CommentHeader, CommentBody, CommentFooter } from "../_shared";

import styles from "./reply.module.scss";
import { ImageProfile10 } from "../../../../../../assets";

//TODO: Content / Footer 로 Component 분리
const Reply = ({
  profileImage,
  username,
  content,
  date,
  className,
  ...props
}) => {
  // props type 작성
  return (
    <li className={styles.wrapper}>
      <CommentHeader
        className={styles.grade}
        profileImage={ImageProfile10}
        username={"닉네임"}
      />
      <CommentBody className={styles.content} content={"코멘트 답글 내용"} />
      <hr className={styles.horizontalLine} />
      <CommentFooter
        className={styles.comment}
        date={dayjs().format("YYYY.MM.DD")}
      />
    </li>
  );
};

export default Reply;
