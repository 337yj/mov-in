import React from "react";

import styles from "./header.module.scss";

//TODO:선택한 프로필 이미지 불러오기
//TODO: 나의 정보 불러오기
// export const getUsersMe = () => {
//   return apiClient.get(`/users/me`);
// };

const CommentHeader = ({
  profileImage,
  username,
  grade,
  className,
  ...props
}) => {
  // NOTE: Number().toFixed(1); => 소수점 1자리까지 표기

  return (
    <article className={styles.wrapper}>
      <figure className={styles.profile}>
        <img src={profileImage} alt="" className={styles.profileImage} />
        <figcaption className={styles.username}>{username}</figcaption>
      </figure>
      <output className={className}>평점★{grade?.toFixed(1)}</output>
    </article>
  );
};

export default CommentHeader;
