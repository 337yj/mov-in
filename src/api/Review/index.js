import apiClient from "../apiClient";

// 영화 리뷰 수 구하기
export const getReviewsCount = () => {
  return apiClient.get(`/reviews/count`);
};

// 리뷰 목록 조회
export const getReviews = (
  page = 1,
  limit = 20,
  name = null,
  nickname = null,
) => {
  let url = `/reviews?page=${page}&limit=${limit}`;
  if (name) {
    url += `&name=${name}`;
  }
  if (nickname) {
    url += `&nickname=${nickname}`;
  }
  return apiClient.get(url);
};

// 영화 리뷰 목록 조회
export const getReviewsMovie = (movieId) => {
  return apiClient.get(`/reviews/movie/${movieId}`);
};

// 영화 리뷰 상세 조회
export const getReviewsDetail = (id) => {
  return apiClient.get(`/reviews/${id}/detail`);
};

// 나의 영화 리뷰 조회
export const getMovieMyReview = (id) => {
  return apiClient.get(`/reviews/movie/${id}/me`);
};

// 나의 영화 리뷰 목록
export const getReviewMe = () => {
  return apiClient.get(`/reviews/me`);
};

// 유저 영화 리뷰 목록
export const getReviewUser = (userId) => {
  return apiClient.get(`/reviews/users/${userId}`);
};

// 영화 리뷰 생성
export const createReview = (movieId, body) => {
  return apiClient.post(`/reviews/${movieId}`, body);
};

// 리뷰 수정
export const updateReviews = (id, body) => {
  return apiClient.patch(`/reviews/${id}`, body);
};

// 리뷰 삭제
export const deleteReviews = (id) => {
  return apiClient.delete(`/reviews/${id}`);
};

// 리뷰 댓글 생성
export const createReviewsComments = (id, body) => {
  return apiClient.post(`/reviews/${id}/comments`, body);
};

// 리뷰 댓글 수정
export const updateReviewsComments = (id, body) => {
  return apiClient.patch(`/reviews/comments/${id}`, body);
};

// 리뷰 댓글 삭제
export const deleteReviewsComments = (id) => {
  return apiClient.delete(`/reviews/comments/${id}`);
};

// 리뷰 좋아요
export const createReviewsLike = (id) => {
  return apiClient.post(`/reviews/${id}/like`);
};

// 리뷰 좋아요 삭제
export const deleteReviewsLike = (id) => {
  return apiClient.delete(`/reviews/${id}/like`);
};
