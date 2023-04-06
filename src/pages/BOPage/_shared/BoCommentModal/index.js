import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getReviewsDetail } from "../../../../api/Review";

import { Modal, Button } from "../../../../components";

import styles from "./boCommentModal.module.scss";

const BoMovieModal = ({ movie, modal, setModal }) => {
  const onClickModal = () => {
    setModal(!modal);
  };

  const { id } = useParams();

  const [comment, setComment] = useState([]);

  const onGetCommentsDetail = async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        setComment(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetCommentsDetail();
  }, [id]);

  if (!comment) {
    return null;
  }

  return (
    modal && (
      <Modal
        className={styles.boCommentModal}
        review={id}
        title={"코멘트 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.content}>
            <figure className={styles.profile}>
              <img
                src={id.profileImage}
                alt="profileImage"
                className={styles.profileImage}
              />
              <figcaption className={styles.username}>{id.nickname}</figcaption>
              <Stars />
              <Tag className={styles.pointTag} />
              <Tag className={styles.tensionTag} />
            </figure>
            <CommentBody className={styles.content} content={id.content} />
            <CommentFooter
              movie={movie}
              className={styles.comment}
              date={dayjs(id.createdAt).format("YYYY.MM.DD")}
            />
          </section>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.delete}
              color={"primary"}
              children={"삭제"}
            />
            <Button
              className={styles.cancel}
              color={"secondary"}
              children={"취소"}
            />
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;
