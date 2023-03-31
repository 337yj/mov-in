import React from "react";
import dayjs from "dayjs";

import {
  CommentHeader,
  CommentBody,
  CommentFooter,
} from "../../../../../pages";

import styles from "./commentOutput.module.scss";
import { ImageProfile1 } from "../../../../../assets";

//TODO: Component 큰 단위로 분리하기
//NOTE: Component를 너무 작게 분리하면 추후에 수정이 힘들어집니다.
//NOTE: 특정 페이지에서 공통적으로 사용되는 폴더는 _shared 폴더를 만들어서 사용해보세요.
//NOTE: 이름 뒤에 ~~Box 붙이는 패턴은 좋지는 않습니다.

const CommentOutput = ({
  profileImage,
  username,
  grade,
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
        profileImage={ImageProfile1}
        username={"닉네임"}
        grade={4.0}
      />
      <hr className={styles.horizontalLine} />
      <CommentBody className={styles.content} content={"코멘트 내용"} />
      <hr className={styles.horizontalLine} />
      {/* //NOTE: dayjs를 다운로드 */}
      {/* //NOTE: -> 2023.03.29 오전 1시 12분 */}
      {/* //NOTE: 용량 moment.js >>> dayjs */}

      <CommentFooter
        className={styles.comment}
        date={dayjs().format("YYYY.MM.DD")}
      />
    </li>
  );
};

export default CommentOutput;
