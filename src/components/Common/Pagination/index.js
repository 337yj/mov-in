import React, { memo } from "react";
import Pagination from "react-js-pagination";
import styles from "./paging.module.scss";
import { IconCaretLeft } from "../../../assets";
import { IconCaretRight } from "../../../assets";

const Paging = ({
  totalCount,
  postPerPage,
  pageRangeDisplayed,
  onChange,
  page,
}) => {
  return (
    <Pagination
      activePage={page} // 현재 활성화된 페이지 번호
      itemsCountPerPage={postPerPage} // 페이지 당 표시될 아이템의 수
      totalItemsCount={totalCount ? totalCount : 0} // 전체 아이템의 수
      pageRangeDisplayed={pageRangeDisplayed} // 표시될 페이지 버튼의 개수를 지정
      firstPageText={<IconCaretLeft className={styles.icon} />}
      prevPageText={<IconCaretLeft className={styles.icon} />} // 이전 페이지 버튼에 표시될 텍스트
      lastPageText={<IconCaretRight className={styles.icon} />}
      nextPageText={<IconCaretRight className={styles.icon} />} // 다음 페이지 버튼에 표시될 텍스트
      onChange={onChange} // 페이지 변경 이벤트가 발생할 때마다 page 상태값을 업데이트하도록 구현
      innerClass={styles.pagination}
    />
  );
};

export default memo(Paging);
