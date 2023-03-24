import React from "react";

import styles from "./profile.module.scss";

const Profile = ({ profileImage, username, ...props }) => {
  // props type 작성
  return (
    <figure className={styles.profile}>
      {/* 선택한 사진 불러오는 기능 */}
      <img src={profileImage} alt="" className={styles.profileImage} />
      <figcaption className={styles.username}>{username}</figcaption>
    </figure>
  );
};

export default Profile;
