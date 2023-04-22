import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getMovie } from "../../../api/Movie";
import { getReviewsMovie, getReviewsMoviePaging } from "../../../api/Review";
import { toastFloatState, toastMsgState } from "../../../state";
import { useRecoilState } from "recoil";
import { useInView } from "react-intersection-observer";
import { Toast } from "../../../components";
import { msgList } from "../_shared/toastMsg";
import Comment from "./Comment";
import { formatRuntime } from "../_shared/formatRuntime";
import dayjs from "dayjs";
import styles from "./commentList.module.scss";

const CommentList = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  //NOTE: 페이지가 바뀔 때마다 scroll을 최상단으로 올려준다. => react-router-dom scroll to top
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location.pathname]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);
  const [ref, inView] = useInView();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState();
  const [comments, setComments] = useState();
  const [toastFloat, setToastFloat] = useRecoilState(toastFloatState);
  const [toastMsg, setToastMsg] = useRecoilState(toastMsgState);
  const formattedRuntime = formatRuntime(movie?.runtime || 0);

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  //console.log(items);

  const onGetMovieCommentsPaging = useCallback(async () => {
    //NOTE: page가 -1일 때 요청하지 않도록 설정
    if (page === -1) return;

    setLoading(true);
    const response = await getReviewsMoviePaging(id, page, 5);
    if (response.status === 200) {
      const dataItems = [...response.data.data];
      if (page === 1) {
        setItems(dataItems);
        setLoading(false);
        return;
      }
      setItems((prevItems) => {
        // 중복
        // const newItems = dataItems.filter(
        //   (item) => !prevItems.find((prevItem) => prevItem.id === item.id),
        // );
        // return [...prevItems, ...newItems].sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        // );

        return [...prevItems, ...dataItems];
      });
      if (dataItems.length < 5) {
        setPage(-1); // 더 이상 데이터를 로딩하지 않도록 페이지 번호를 -1로 설정
      }
    }
    setLoading(false);
  }, [id, page]);

  useEffect(() => {
    if (inView && !loading && page !== -1) {
      // 더 이상 데이터를 로딩하지 않도록 페이지 번호를 -1로 설정한 경우, 새로운 페이지를 요청하지 않도록
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, page]);

  useEffect(() => {
    onGetMovieCommentsPaging();
  }, [onGetMovieCommentsPaging]);

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onGetMovieComments = async () => {
  //   try {
  //     const response = await getReviewsMoviePaging(id, 1, 5);
  //     if (response.status === 200) {
  //       setItems(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  useEffect(() => {
    // onGetMovieComments();
    onGetMovieDetail();
  }, [id]);

  // if (!comments) {
  //   return null;
  // }

  return (
    <main>
      <Toast children={toastMsg} float={toastFloat} />
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.backgroundImg}
          src={movie?.postImage}
          alt="thumbnail"
        />
        <div className={styles.backgroundGradient} />
      </div>
      <section className={styles.wrapper}>
        <article className={styles.infoWrapper}>
          <div
            className={styles.title}
            onClick={onClickNavigate(`/detail/${movie?.id}`)}
          >
            <h1>{movie?.title}</h1>
          </div>
          <div className={styles.info}>
            <p>{formattedRuntime}</p>
            <p>{movie?.genres.map((genre) => genre.name).join(", ")}</p>
            <p>{dayjs(movie?.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}</p>
          </div>
        </article>
        <article className={styles.detailInfoWrapper}>
          <div className={styles.commentWrapper}>
            <h2>코멘트</h2>
            {items.length > 0 ? (
              <ul className={styles.commentList}>
                {items.map((comment) => (
                  <li key={comment.id} className={styles.comment}>
                    <Comment
                      comment={comment}
                      toast={toast}
                      onGetMovieComments={async () => {
                        setPage(1);
                        await onGetMovieCommentsPaging();
                      }}
                    />
                  </li>
                ))}
                <div ref={ref}></div>
              </ul>
            ) : (
              <p className={styles.noExistComment}>작성된 코멘트가 없습니다.</p>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default CommentList;
