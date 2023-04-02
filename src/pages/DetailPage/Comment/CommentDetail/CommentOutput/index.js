import React from "react";
import dayjs from "dayjs";

import {
  CommentHeader,
  CommentBody,
  CommentFooter,
} from "../../../../../pages";

import styles from "./commentOutput.module.scss";
import { ImageProfile1 } from "../../../../../assets";
import { getReviewsMovie } from "../../../../../api/Review";
import { useParams } from "react-router-dom";

//TODO: Component 큰 단위로 분리하기
//NOTE: Component를 너무 작게 분리하면 추후에 수정이 힘들어집니다.
//NOTE: 특정 페이지에서 공통적으로 사용되는 폴더는 _shared 폴더를 만들어서 사용해보세요.
//NOTE: 이름 뒤에 ~~Box 붙이는 패턴은 좋지는 않습니다.

// 윤 - CommentOutput -> Comment
const CommentOutput = ({
  movie,
  profileImage,
  username,
  grade,
  content,
  date,
  className,
  ...props
}) => {
  // props type 작성
  // 영화 리뷰 목록 조회
  // export const getReviewsMovie = (movieId) => {
  //   return apiClient.get(`/reviews/movie/${movieId}`);
  // };

  return (
    // 윤 - 코멘트상자 컴포넌트 아닌가?? 최상위 태그를 li로한 이유?
    // section이 좋을듯 어차피 상위 컴포넌트에서 불러올 때 li.map으로 해야되니..
    <li className={styles.wrapper} onClick={props.onClick}>
      <CommentHeader
        className={styles.grade}
        profileImage={ImageProfile1}
        username={"닉네임"}
        grade={4.0}
      />
      {/* 윤 - hr태그는 다른 주제로 넘어갈 때 사용, 지금은 가로선이 단지 스타일용도니까
        각 컴포넌트 wrapper에 border-bottom으로 스타일 주는게 좋을것 같음
      */}
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
