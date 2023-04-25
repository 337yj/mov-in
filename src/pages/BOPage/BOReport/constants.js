export const getReportType = (type) => {
  if (type === "IGNORE") return "삭제";

  if (type === "USER_DELETE") return "탈퇴";

  return "-";
};
