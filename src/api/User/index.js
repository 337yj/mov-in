import apiClient from "../apiClient";

// 전체 이용자 수 구하기
export const getUsersCount = () => {
  return apiClient.get(`/users/count`);
};

// 나의 정보 불러오기
export const getUsersMe = () => {
  return apiClient.get(`/users/me`);
};

// 나의 추가 정보 불러오기 (좋아요 / 리뷰 개수 / 별점)
export const getUsersMeInfo = () => {
  return apiClient.get(`/users/me/info`);
};

// 유저 추가 정보 불러오기 (좋아요 / 리뷰 개수 / 별점)
export const getUsersInfo = (userId) => {
  return apiClient.get(`/users/${userId}/info`);
};

// 유저 자세히 불러오기
export const getUsersDetail = (id) => {
  return apiClient.get(`/users/${id}/detail`);
};

// 유저 목록 불러오기
export const getUsers = (
  page = 1,
  limit = 20,
  name = null,
  nickname = null,
) => {
  let url = `/users?page=${page}&limit=${limit}`;
  if (name) {
    url += `&name=${name}`;
  }
  if (nickname) {
    url += `&nickname=${nickname}`;
  }
  return apiClient.get(url);
};

// 유저 생성하기
export const createUser = (body) => {
  return apiClient.post("/users", body);
};

// 유저 수정하기
export const updateUser = (id, body) => {
  return apiClient.patch(`/users/${id}`, body);
};

// 유저 수정하기
export const updateMe = (body) => {
  return apiClient.patch(`/users/`, body);
};

// 유저 삭제하기
export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export const countUsers = () => {
  return apiClient.get(`users/count`);
};
