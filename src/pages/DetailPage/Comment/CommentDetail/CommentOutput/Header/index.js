import React from "react";

import styles from "./header.module.scss";

const CommentHeader = ({
  profileImage,
  username,
  grade,
  className,
  ...props
}) => {
  // props type 작성

  return (
    <header className={styles.wrapper}>
      <figure className={styles.profile}>
        {/* 선택한 사진 불러오는 기능 */}
        <img src={profileImage} alt="" className={styles.profileImage} />
        <figcaption className={styles.username}>{username}</figcaption>
      </figure>
      <output className={className}>평점★{grade}</output>
    </header>
  );
};

export default CommentHeader;
