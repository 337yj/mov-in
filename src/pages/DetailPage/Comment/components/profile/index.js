import React from "react";

import styles from "./profile.module.scss";

const Profile = ({ username }) => {
  return (
    <header className={styles.replyHeader}>
      <img className={styles.profile} />
      <div className={styles.username}>{username}</div>
    </header>
  );
};

export default Profile;
