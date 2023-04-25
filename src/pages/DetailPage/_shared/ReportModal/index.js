import cx from "classnames";
import { ImageProfile2 } from "../../../../assets";
import { Button, Modal } from "../../../../components";
import Comment from "../../CommentList/Comment";
import * as ProfileImages from "../../../../assets/images/profileImages";
import styles from "./reportModal.module.scss";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { createReport } from "../../../../api/Report";

const ReportModal = ({ review, modal, setModal }) => {
  const [selectedTab, setSelectedTab] = useState([]);
  const navigate = useNavigate();

  const onCreateReport = async () => {
    await createReport(review.id, {
      reason: selectedTab.join(","),
    });
    setModal(false);
  };

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const onClickTab = (tab) => {
    return () => {
      if (selectedTab.includes(tab)) {
        setSelectedTab(selectedTab.filter((item) => item !== tab));
      } else {
        setSelectedTab([...selectedTab, tab]);
      }
    };
  };

  return (
    modal && (
      <Modal
        className={styles.reportModal}
        title={"신고"}
        subTitle={"신고를 하실 경우 취소가 불가합니다."}
        setModal={setModal}
      >
        <div className={styles.reasonWrapper}>
          <h1>신고 사유</h1>
          <div className={styles.reasons}>
            <Button
              className={cx(styles.tab, {
                [styles.selected]: selectedTab.includes("허위"),
              })}
              onClick={onClickTab("허위")}
            >
              허위
            </Button>
            <Button
              className={cx(styles.tab, {
                [styles.selected]: selectedTab.includes("비방"),
              })}
              onClick={onClickTab("비방")}
            >
              비방
            </Button>
            <Button
              className={cx(styles.tab, {
                [styles.selected]: selectedTab.includes("광고"),
              })}
              onClick={onClickTab("광고")}
            >
              광고
            </Button>
            <Button
              className={cx(styles.tab, {
                [styles.selected]: selectedTab.includes("선정성"),
              })}
              onClick={onClickTab("선정성")}
            >
              선정성
            </Button>
            <Button
              className={cx(styles.tab, {
                [styles.selected]: selectedTab.includes("기타"),
              })}
              onClick={onClickTab("기타")}
            >
              기타
            </Button>
          </div>
        </div>
        <h1 className={styles.commentTitle}>신고 코멘트</h1>
        <article className={styles.comment}>
          <div className={styles.userInfo}>
            <div>
              <img
                src={
                  !review.user?.profileImage ||
                  review.user?.profileImage.includes("Icon")
                    ? ImageProfile2
                    : Object.entries(ProfileImages).filter(([key, value]) => {
                        return key === review.user?.profileImage;
                      })[0][1]
                }
                alt="userProfileImage"
                className={styles.profileImage}
                onClick={onClickNavigate(`/userPage/${review.user?.id}`)}
              />
              <p className={styles.username}>
                {review.user?.nickname ?? review.user?.name}
              </p>
            </div>
            <p className={styles.score}>평점 {review.score?.toFixed(1)}</p>
          </div>
          <p className={styles.content}>{review.content}</p>
          <div className={styles.footer}>
            <p>좋아요 / 대댓글</p>
            <p>{dayjs(review.createdAt).format("YYYY.MM.DD")}</p>
          </div>
        </article>
        <div className={styles.buttonWrapper}>
          <Button color="primary" onClick={onCreateReport}>
            신고
          </Button>
          <Button color="danger" onClick={() => setModal(false)}>
            취소
          </Button>
        </div>
      </Modal>
    )
  );
};

export default ReportModal;
