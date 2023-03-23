import React from "react";
import { IconModify, IconDelete } from "../../../../../assets/icon";
import LikeCount from "../likeCount";
import { HorizontalLine } from "../../../../../components/Common";
import Profile from "../profile";

import styles from "./replyBox.module.scss";

const ReplyBox = ({ username, content, createdAt, ...props }) => {
  return (
    <li className={styles.wrapper}>
      <Profile />
      <content className={styles.replyContent}>
        <div className={styles.comment}>{content}</div>
        <div className={styles.icon}>
          <IconModify />
          <IconDelete className={styles.iconDelete} />
        </div>
      </content>
      <footer className={styles.replyFooter}>
        <HorizontalLine />
        <div className={styles.footerContent}>
          <LikeCount />
          <div className={styles.date}>{createdAt}</div>
        </div>
      </footer>
    </li>
  );
};

export default ReplyBox;
