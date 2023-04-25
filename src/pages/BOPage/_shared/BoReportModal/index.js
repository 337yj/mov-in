import dayjs from "dayjs";
import { Button, Modal } from "../../../../components";
import styles from "./boReportModal.module.scss";
import { ImageProfile2 } from "../../../../assets";
import {
  deleteReport,
  getReportDetail,
  updateReport,
} from "../../../../api/Report";
import { useEffect, useState } from "react";
import { getUsersDetail } from "../../../../api/User";

const BoReportModal = ({ modal, report, setModal, onClose }) => {
  const [reportData, setReportData] = useState(null);
  const [user, setUser] = useState(null);
  const onGetReportDetail = async () => {
    const response = await getReportDetail(report);

    setReportData(response.data);
  };

  const onGetUser = async (id) => {
    const response = await getUsersDetail(id);

    setUser(response.data);
  };

  const onIgnoreReport = async () => {
    await updateReport(report, {
      type: "IGNORE",
    });
    onClose();
    setModal(false);
  };

  const onUserDeleteReport = async () => {
    await updateReport(report, {
      type: "USER_DELETE",
    });
    onClose();
    setModal(false);
  };

  const onDeleteReport = async () => {
    await deleteReport(report);
    onClose();
    setModal(false);
  };

  useEffect(() => {
    if (report) onGetReportDetail();
  }, [report]);

  useEffect(() => {
    if (reportData) onGetUser(reportData.userId);
  }, [reportData]);

  return (
    modal && (
      <Modal
        title="신고 관리"
        subTitle="신고된 내역을 확인할 수 있습니다."
        setModal={setModal}
      >
        <p className={styles.reportContent}>
          신고 일자 : {dayjs(reportData?.createdAt).format("YYYY.MM.DD")}
        </p>
        <p className={styles.reportContent}>신고 사유 : {reportData?.reason}</p>
        <article className={styles.comment}>
          <div className={styles.userInfo}>
            <div>
              <img
                src={
                  !user?.profileImage || user?.profileImage.includes("Icon")
                    ? ImageProfile2
                    : Object.entries(ProfileImages).filter(([key, value]) => {
                        return key === user?.profileImage;
                      })[0][1]
                }
                alt="userProfileImage"
                className={styles.profileImage}
              />
              <p className={styles.username}>{user?.nickname ?? user?.name}</p>
            </div>
            <p className={styles.score}>평점 {reportData?.score}</p>
          </div>
          <p className={styles.content}>{reportData?.review?.content}</p>
        </article>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.deleteButton}
            color={"secondary"}
            onClick={onIgnoreReport}
          >
            무시
          </Button>
          <Button
            className={styles.deleteButton}
            color={"warning"}
            onClick={onDeleteReport}
          >
            삭제
          </Button>
          <Button
            className={styles.deleteButton}
            color={"danger"}
            onClick={onUserDeleteReport}
          >
            탈퇴
          </Button>
        </div>
      </Modal>
    )
  );
};

export default BoReportModal;
