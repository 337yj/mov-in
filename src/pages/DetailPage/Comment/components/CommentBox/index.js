import React from "react";
import { IconModify, IconDelete } from "../../../../../assets/icon";
import LikeCount from "../_shared/LikeCount";
import CommentCount from "../CommnetCount";
import Profile from "../_shared/Profile";

import styles from "./commentBox.module.scss";
import { ImageProfile3 } from "../../../../../assets";

//TODO: Component 큰 단위로 분리하기
//NOTE: Component를 너무 작게 분리하면 추후에 수정이 힘들어집니다.

//NOTE: 특정 페이지에서 공통적으로 사용되는 폴더는 _shared 폴더를 만들어서 사용해보세요.

//NOTE: 이름 뒤에 ~~Box 붙이는 패턴은 좋지는 않습니다.

const CommentBox = ({ grade, content, ...props }) => {
  // props type 작성

  return (
    <li className={styles.wrapper}>
      {/* Header */}
      <section className={styles.commentHeader}>
        <Profile profileImage={ImageProfile3} />
        <output className={styles.grade}>평점★{grade}</output>
      </section>

      {/* Body / Content */}
      <section className={styles.commentContent}>
        <hr className={styles.horizontalLine} />
        <content className={styles.comment}>{content}</content>
        <output className={styles.icon}>
          {/* 알림 띄우고 수정 모달로 이동 기능 추가*/}
          <IconModify />
          {/* 알림 띄우고 코멘트 삭제 기능 추가 */}
          <IconDelete />
        </output>
      </section>

      {/* Footer */}
      <section className={styles.commentFooter}>
        <hr className={styles.horizontalLine} />
        <content className={styles.footerContent}>
          <output className={styles.count}>
            <LikeCount />
            <CommentCount />
          </output>
          {/* 작성날짜 기능 추가 */}
          <output className={styles.date}></output>
        </content>
      </section>
    </li>
  );
};

export default CommentBox;
