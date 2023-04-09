import React, { useEffect, useState } from "react";
import { getReviewsDetail } from "../../../../api/Review";
import { commentIdState, userState } from "../../../../state";
import { useRecoilState, useRecoilValue } from "recoil";
import { CommentHeader, CommentBody, CommentFooter } from "./Comment/_shared";
import { Reply } from "../../../../pages";
import { Button } from "../../../../components";
import { ImageProfile1 } from "../../../../assets";
import styles from "./commentDetail.module.scss";

const CommentDetail = ({ comment, onChangeTab, ...props }) => {
  const [detailComment, setDetailComment] = useState();
  const commentId = useRecoilValue(commentIdState);
  const [user, setUser] = useRecoilState(userState);

  if (!commentId) {
    return null;
  }

  const onGetReviewsDetail = async () => {
    try {
      const response = await getReviewsDetail(commentId);
      if (response.status === 200) {
        setDetailComment(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetReviewsDetail();
  }, [commentId]);

  console.log(detailComment);
  // console.log(user);

  return (
    <article className={styles.wrapper}>
      <h2>코멘트</h2>
      <div className={styles.innerWrapper}>
        <section className={styles.commentWrapper}>
          <CommentHeader comment={detailComment} profileImage={ImageProfile1}>
            {detailComment?.score.toFixed(1)}
          </CommentHeader>
          <CommentBody comment={detailComment} />
          <CommentFooter comment={detailComment} />
        </section>
        <section className={styles.replyInputWrapper}>
          {/* <CommentHeader user={user} profileImage={ImageProfile1}>
            <Button>등록</Button>
          </CommentHeader> */}
          <p>{user?.nickname}</p>
          <textarea
            className={styles.replyInput}
            placeholder={
              user ? "댓글을 작성해주세요." : "로그인 후 작성해주세요."
            }
          ></textarea>
        </section>
        <section>
          {/* 이건 출력되는데 */}
          {/* {detailComment.comments[0].content} */}
          <ul>
            {/* 이건 왜 출력이안될까 */}
            {detailComment?.comments.map((reply) => {
              <li key={reply.id}>
                {detailComment?.comments.content}
                {/* <Reply detailComment={detailComment}></Reply> */}
              </li>;
            })}
          </ul>
        </section>
      </div>
    </article>
  );
};

export default CommentDetail;

// const CommentDetail = ({
//   profileImage,
//   comment,
//   username,
//   movie,
//   onChangeTab,
//   selectedCommentId,
//   ...props
// }) => {
//   const [detailComment, setDetailComment] = useState();
//   const [commentId, setCommentId] = useRecoilState(commentIdState);
//   // const { id } = useParams();

//   if (!selectedCommentId) {
//     return null;
//   }

//   const onGetReviewsDetail = async () => {
//     try {
//       const response = await getReviewsDetail(selectedCommentId);
//       if (response.status === 200) {
//         setDetailComment(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     onGetReviewsDetail();
//   }, [selectedCommentId]);

//   // console.log(selectedCommentId);
//   // console.log(detailComment);

//   return (
//     <article className={styles.wrapper}>
//       <div className={styles.innerWrapper}>
//         <h2>코멘트</h2>
//         <section className={styles.selectedComment}>
//           <div>유저 닉넴, 리뷰포인트</div>
//           <p>{detailComment.content}</p>
//           <CommentBody comment={detailComment} />
//           <CommentFooter comment={detailComment} />
//         </section>
//         <section></section>
//       </div>
//     </article>
//   );
// };

// export default CommentDetail;
