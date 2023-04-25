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

export const getReportDetail = (id) => {
  return apiClient.get(`/reports/${id}/detail`);
};

export const createReport = (reviewId, body) => {
  return apiClient.post(`/reports/${reviewId}`, body);
};

export const updateReport = (id, body) => {
  return apiClient.patch(`/reports/${id}/admin`, body);
};

export const deleteReport = (id) => {
  return apiClient.delete(`/reports/${id}/admin`);
};
