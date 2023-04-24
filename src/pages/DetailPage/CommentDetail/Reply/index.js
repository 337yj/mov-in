import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteReviewsComments,
  updateReviewsComments,
} from "../../../../api/Review";
import { userState } from "../../../../state";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import * as ProfileImages from "../../../../assets/images/profileImages";
import { ImageProfile2 } from "../../../../assets";
import { BsCheck2, BsPencilSquare, BsTrash, BsX } from "react-icons/bs";
import styles from "./reply.module.scss";

const Reply = ({ reply, toast, onGetCommentDetail, className, ...props }) => {
  const [replyContent, setReplyContent] = useState(reply.content);
  const [initialContent, setInitialContent] = useState(reply.content);
  const [isModify, setIsModify] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const isAuthor = reply?.user?.id === user?.id;

  const onChange = (e) => {
    setReplyContent(e.currentTarget.value);
  };

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onSubmit = async () => {
    if (!isModify) return;
    const replyData = { content: replyContent };
    try {
      await updateReviewsComments(reply.id, replyData);
      setIsModify(false);
      toast("modify");
    } catch (error) {
      console.error(error);
    }
  };

  const onClickModify = () => {
    setIsModify(true);
    setInitialContent(replyContent);
  };

  const onClickCancel = () => {
    setReplyContent(initialContent);
    setIsModify(false);
  };

  const onClickDelete = async () => {
    await deleteReviewsComments(reply.id);
    await onGetCommentDetail();
    toast("delete");
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.profileWrapper}>
        <img
          src={
            !reply.user?.profileImage ||
            reply.user?.profileImage.includes("Icon")
              ? ImageProfile2
              : Object.entries(ProfileImages).filter(([key, value]) => {
                  return key === reply.user?.profileImage;
                })[0][1]
          }
          alt="userProfileImage"
          className={styles.profileImage}
          onClick={onClickNavigate(`/userPage/${reply.user?.id}`)}
        />
        <p className={styles.username}>
          {reply.user?.nickname ?? reply.user?.name}
        </p>
      </div>
      {isModify ? (
        <textarea
          className={styles.content}
          name="myReply"
          value={replyContent}
          onChange={onChange}
        ></textarea>
      ) : (
        <p className={styles.readOnlyContent}>{replyContent}</p>
      )}
      <div className={styles.replyInfoWrapper}>
        {isAuthor && (
          <div className={styles.btnWrapper}>
            {isModify ? (
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
          </div>
        )}
        <p className={styles.date}>
          {dayjs(reply.updatedAt).format("YYYY.MM.DD")}
        </p>
      </div>
    </section>
  );
};

export default Reply;
