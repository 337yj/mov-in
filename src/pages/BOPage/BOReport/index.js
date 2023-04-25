import { useEffect, useState } from "react";
import {
  deleteReport,
  getReportStatus,
  getReports,
  updateReport,
} from "../../../api/Report";

import styles from "./boReport.module.scss";

import { getReportType } from "./constants";
import { Button, NoResult, Paging, Table } from "../../../components";
import { BoReportModal, SearchInput } from "../_shared";
import dayjs from "dayjs";

const columns = [
  { Header: "신고일자", accessor: "신고일자" },
  { Header: "신고자", accessor: "신고자" },
  { Header: "신고사유", accessor: "신고사유" },
  { Header: "코멘트 내용", accessor: "코멘트 내용" },
  { Header: "처리내역", accessor: "처리내역" },
  { Header: "처리일자", accessor: "처리일자" },
];

const POST_PER_PAGE = 10;

const BOReport = () => {
  const [reportStatus, setReportStatus] = useState();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState([]);
  const [clickedReport, setClickedReport] = useState(null);

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [form, setForm] = useState();
  const [modal, setModal] = useState(false);

  const data = reports.map((report) => ({
    id: report.id,
    신고일자: dayjs(report.createdAt, "YYYYMMDD").format("YYYY.MM.DD"),
    신고자: report.user.nickname ?? "-",
    신고사유: report.reason ?? "-",
    "코멘트 내용": report.review.content ?? "-",
    처리내역: getReportType(report.type),
    처리일자: report.processedAt
      ? dayjs(report.processedAt, "YYYYMMDD").format("YYYY.MM.DD")
      : "-",
  }));

  const onChange = (page) => {
    setPage(page);
  };

  const onClickModal = (user) => {
    return () => {
      setModal(!modal);
      setClickedReport(user);
    };
  };

  const onCloseModal = () => {
    setModal(!modal);
    setClickedReport(null);
  };

  const onGetReportStatus = async () => {
    const response = await getReportStatus();

    if (response.status === 200) {
      setReportStatus(response.data);
    }
  };

  const onGetReports = async () => {
    try {
      const response = await getReports(page, POST_PER_PAGE);
      if (response.status === 200) {
        setReports(response.data.data);
        setTotalCount(response.data.paging.totalCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onIgnoreReport = async () => {
    selectedReport.forEach(async (id) => {
      await updateReport(id, {
        type: "IGNORE",
      });
    });
    onGetReports();
  };

  const onUserDeleteReport = async () => {
    selectedReport.forEach(async (id) => {
      await updateReport(id, {
        type: "USER_DELETE",
      });
    });
    onGetReports();
  };

  const onDeleteReport = async () => {
    selectedReport.forEach(async (id) => {
      await deleteReport(id);
    });
    onGetReports();
  };

  const onSearchReports = async () => {
    try {
      const response = await getReports(page, POST_PER_PAGE, form);
      if (response.status === 200) {
        setReports(response.data.data);
        setTotalCount(response.data.paging.totalCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (e) => {
    const { value } = e.currentTarget;

    //NOTE: 검색어가 있다가 사라지면 다시 데이터를 불러오는 로직
    if (value.length === 0) {
      onGetReports();
    }
    setForm(value);
  };

  useEffect(() => {
    onGetReports();
    onGetReportStatus();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h1>신고 관리</h1>
      <article className={styles.reportStatus}>
        <div className={styles.statusWrapper}>
          <div className={styles.pending}>!</div>
          <div className={styles.content}>
            <h2>신고 내역</h2>
            <p>신고 내역 처리 안 된 신고 내역을 확인해 주세요.</p>
          </div>
          <p>{reportStatus?.inProgress}</p>
        </div>
        <div className={styles.statusWrapper}>
          <div className={styles.clear}>✓</div>
          <div className={styles.content}>
            <h2>처리내역</h2>
            <p>처리 내역 현재까지 처리된 신고 통계입니다.</p>
          </div>
          <p>{reportStatus?.completed}</p>
        </div>
      </article>
      <div className={styles.searchWrapper}>
        <SearchInput
          className={styles.searchInput}
          value={form}
          placeholder={"회원 닉네임을 검색하세요."}
          onChange={onChangeInput}
          onSubmit={onSearchReports}
        />
        <div>
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
      </div>
      {data.length === 0 && form?.length > 0 ? (
        <NoResult text={form} />
      ) : (
        <Table
          columns={columns}
          data={data}
          setCheckedItems={setSelectedReport}
          checkedItems={selectedReport}
          secondButton={(user) => (
            <Button color={"warning"} onClick={onClickModal(user)}>
              보기
            </Button>
          )}
        />
      )}
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={POST_PER_PAGE}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
      <BoReportModal
        modal={modal}
        report={clickedReport}
        setModal={setModal}
        onClose={onGetReports}
      />
    </section>
  );
};

export default BOReport;
