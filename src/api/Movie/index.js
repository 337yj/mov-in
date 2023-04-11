import apiClient from "../apiClient";

// 전체 영화 목록 불러오기, limit 20개 까지(임의)
export const getMovies = (page = 1, limit = 20) => {
  return apiClient.get(`movies?page=${page}&limit=${limit}`);
};

// 영화 디테일 불러오기
export const getMovie = (id) => {
  return apiClient.get(`/movies/${id}/detail`);
};

// 영화 전체 수 불러오기
export const getMoviesCount = () => {
  return apiClient.get(`/movies/count`);
};

// 내가 좋아요 한 영화 불러오기
export const getMoviesMeLike = () => {
  return apiClient.get(`/movies/me/like`);
};

// 내가 북마크 한 영화 불러오기
export const getBookmarks = () => {
  return apiClient.get(`/movies/bookmarks/me`)
};

// 영화 장르별로 불러오기
export const getMoviesGenre = (page = 1, limit = 20, genreIds) => {
  return apiClient.get(
    `/movies/genre?page=${page}&limit=${limit}&genreIds=${genreIds}`,
  );
};

// 영화 장르별로 불러오기, 특정 카테고리의 영화를 검색할 때 사용?
export const getMoviesCategory = (categoryIds) => {
  return apiClient.get(`/movies/category?categoryIds=${categoryIds}`);
};

// 영화 카테고리 불러오기, 모든 카테고리를 불러올 때 사용?
export const getMoviesCategories = () => {
  return apiClient.get(`/movies/categories`);
};

// top10 영화 불러오기
export const getMoviesTop = () => {
  return apiClient.get(`/movies/top`);
};

// 연관된 영화 불러오기
export const getRelatedMovies = (id) => {
  return apiClient.get(`/movies/${id}/related`);
};

// 영화 수정하기
export const updateMovie = (id, data) => {
  return apiClient.patch(`/movies/${id}`, data);
};

// 영화 삭제하기
export const deleteMovie = (id) => {
  return apiClient.delete(`/movies/${id}`);
};

// 영화 좋아요 생성
export const createMovieLike = (id) => {
  return apiClient.post(`/movies/${id}/like`);
};

// 영화 좋아요 삭제
export const deleteMovieLike = (id) => {
  return apiClient.delete(`/movies/${id}/like`);
};
