import apiClient from "../apiClient";

// 내가 북마크한 영화를 조회
export const getMyBookmarks = () => {
  return apiClient.get("/bookmarks/me");
};

// 나의 북마크 조회 (page)
export const getBookmarks = (page = 1, limit = 20) => {
  return apiClient.get(`/bookmarks/me/paging?page=${page}&limit=${limit}`);
};

// 북마크 생성
export const createBookmarks = (movieId) => {
  return apiClient.post(`/bookmarks/${movieId}`);
};

// 북마크 삭제
export const deleteBookmarks = (movieId) => {
  return apiClient.delete(`/bookmarks/${movieId}`);
};
