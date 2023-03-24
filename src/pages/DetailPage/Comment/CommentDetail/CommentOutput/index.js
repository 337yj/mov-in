import React from "react";

import {
  CommentHeader,
  CommentBody,
  CommentFooter,
} from "../../../../../pages/index";

import styles from "./commentOutput.module.scss";

//TODO: Component 큰 단위로 분리하기
//NOTE: Component를 너무 작게 분리하면 추후에 수정이 힘들어집니다.

//NOTE: 특정 페이지에서 공통적으로 사용되는 폴더는 _shared 폴더를 만들어서 사용해보세요.

//NOTE: 이름 뒤에 ~~Box 붙이는 패턴은 좋지는 않습니다.

const ReplyOutput = ({
  profilImage,
  username,
  grade,
  content,
  date,
  ...props
}) => {
  // props type 작성

  return (
    <li className={styles.wrapper}>
      <CommentHeader />
      <hr className={styles.horizontalLine} />
      <CommentBody />
      <hr className={styles.horizontalLine} />
      <CommentFooter />
    </li>
  );
};

export default ReplyOutput;
