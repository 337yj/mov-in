import apiClient from "../apiClient";

// 신고생성은 어떻게 하는거지..?
// 신고 목록 조회
export const getReports = (page = 1, limit = 20, username = null) => {
  let url = `/reports?page=${page}&limit=${limit}`;
  if (username) {
    url += `&username=${username}`;
  }
  return apiClient.get(url);
};

export const getReportStatus = () => {
  return apiClient.get("/reports/status");
};

export const createReport = () => {
  return apiClient.get("/reports/status");
};
