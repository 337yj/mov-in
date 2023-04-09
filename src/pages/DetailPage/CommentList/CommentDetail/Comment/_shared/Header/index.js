import React from "react";
import { BsStarFill } from "react-icons/bs";
import styles from "./header.module.scss";
import { ImageProfile2 } from "../../../../../../../assets";

const CommentHeader = ({
  className,
  comment,
  user,
  profileImage,
  children,
  ...props
}) => {
  if (!comment) {
    return null;
  }
  // 윤 -  figure, figcaption, output은 그림,도표,차트,코드블록,수식 등의 콘텐츠를 표시할 때 사용
  // 유저 프로필 정보는 일반적으로 article, section, div 등의 요소를 사용하여 구조화하는 것이 더 적절하다고 하넹..
  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <img
          // src={comment.user.profileImage ?? profileImage}
          src={profileImage}
          alt="userProfileImage"
          className={styles.profileImage}
        />
        <p className={styles.username}>
          {comment.user?.nickname ?? comment.user?.name}
        </p>
        {/* {user && <p className={styles.username}>{user && user?.nickname}</p>} */}
      </div>
      {children}
    </div>
  );
};

export default CommentHeader;
