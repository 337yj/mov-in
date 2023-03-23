import { async } from "q";
import React, { useEffect, useState } from "react";
import { IconComment } from "../../../../../assets/icon/index";

import styles from "./commentCount.module.scss";

const CommentCount = () => {
  // const [comment, setComment] = useState(0);
  // useEffect(()=>{
  //   댓글 전체 갯수 구하기
  //   const getTotalComment = async () => {
  //     const {data} =
  //     return data.total
  //   }
  // })

  return (
    <button className={styles.commentCount}>
      <IconComment />
      <span onClick={() => {}}>답글 {comment}개</span>
    </button>
  );
};

export default CommentCount;
