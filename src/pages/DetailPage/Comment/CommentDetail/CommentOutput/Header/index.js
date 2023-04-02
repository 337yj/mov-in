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

  //TODO:선택한 프로필 이미지 불러오기

  // NOTE: Number().toFixed(1); => 소수점 1자리까지 표기

  return (
    // 윤 - 그냥 내의견임! li태그 안에서 header, footer태그보다 다른 태그 쓰는게 좋을듯
    // li태그는 목록 항목을 나타내는 태그인데,
    // header, footer태그는 각각 콘텐츠의 머리글과 바닥글을 나타내기 위한 태그니까
    // 목록 항목 내부에 사용되기 보다는, 목록 자체를 감싸는 ul, 페이지나 컴포넌트 상단 사용
    <header className={styles.wrapper}>
      <figure className={styles.profile}>
        <img src={profileImage} alt="" className={styles.profileImage} />
        <figcaption className={styles.username}>{username}</figcaption>
      </figure>
      {/* output태그를 사용할려면 header => article */}
      <output className={className}>평점★{grade?.toFixed(1)}</output>
    </header>
  );
};

export default CommentHeader;
