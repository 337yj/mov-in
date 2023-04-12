import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import styles from "./reply.module.scss";
import { ImageProfile4 } from "../../../../assets";
import { userState } from "../../../../state";
import { useRecoilValue } from "recoil";
import {
  BsCheck,
  BsCheck2,
  BsHeart,
  BsHeartFill,
  BsPencilSquare,
  BsTrash,
  BsX,
  BsXSquare,
} from "react-icons/bs";
import {
  deleteReviewsComments,
  updateReviewsComments,
} from "../../../../api/Review";

//TODO:

const Reply = ({
  profileImage,
  reply,
  onGetCommentDetail,
  username,
  content,
  date,
  className,
  ...props
}) => {
  const [replyContent, setReplyContent] = useState(reply.content);
  const [isEditing, setIsEditing] = useState(false);
  const user = useRecoilValue(userState);
  const isAuthor = reply?.user?.id === user?.id;

  const onChange = (e) => {
    setReplyContent(e.currentTarget.value);
  };

  const onSubmit = async () => {
    if (!isEditing) return;

    const replyData = { content: replyContent };
    try {
      await updateReviewsComments(reply.id, replyData);
      await onGetCommentDetail();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickModify = () => {
    setIsEditing(true);
    setReplyContent(reply.content);
  };

  const onClickCancel = () => {
    setReplyContent(reply.content);
    setIsEditing(false);
  };

  const onClickDelete = async () => {
    await deleteReviewsComments(reply.id);
    await onGetCommentDetail();
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <img
          src={ImageProfile4}
          alt="userProfileImage"
          className={styles.profileImage}
        />
        <p className={styles.username}>
          {reply.user?.nickname ?? reply.user?.name}
        </p>
      </div>
      {isEditing ? (
        <textarea
          className={styles.content}
          name="myReply"
          value={replyContent}
          onChange={onChange}
        ></textarea>
      ) : (
        <p className={styles.content}>{replyContent}</p>
      )}
      <div className={styles.replyInfoWrapper}>
        <div>
          {isAuthor && (
            <>
              {isEditing ? (
                <>
                  <button
                    className={styles.saveBtn}
                    type="submit"
                    onClick={onSubmit}
                  >
                    <BsCheck2 className={styles.iconSave} />
                  </button>
                  <button className={styles.cancelBtn} onClick={onClickCancel}>
                    <BsX className={styles.iconCancel} />
                  </button>
                </>
              ) : (
                <>
                  <button className={styles.modifyBtn}>
                    <BsPencilSquare
                      className={styles.iconModify}
                      onClick={onClickModify}
                    />
                  </button>
                  <button className={styles.deleteBtn} onClick={onClickDelete}>
                    <BsTrash className={styles.iconDelete} />
                  </button>
                </>
              )}
            </>
          )}
          <p className={styles.date}>
            {dayjs(reply.updatedAt).format("YYYY.MM.DD")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reply;
