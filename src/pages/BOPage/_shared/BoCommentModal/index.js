import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getReviewsDetail } from "../../../../api/Review";

import { Modal, Button } from "../../../../components";

import styles from "./boCommentModal.module.scss";

const BoMovieModal = ({ comment, user, modal, onCloseModal }) => {
  const { id, profileImage } = useParams();

  const [comments, setComments] = useState([]);

  const onClickModal = () => {
    onCloseModal();
  };

  const onGetCommentsDetail = async () => {
    try {
      const response = await getReviewsDetail(id);
      if (response.status === 200) {
        setComments(response.data);
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
        review={comment}
        title={"코멘트 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.content}>
            <figure className={styles.profile}>
              <img
                src={user.profileImage}
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
            <Button className={styles.delete} color={"primary"}>
              삭제
            </Button>
            <Button className={styles.cancel} color={"secondary"}>
              취소
            </Button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;
