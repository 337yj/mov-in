export const getReportType = (type) => {
  if (type === "IGNORE") return "무시";

  if (type === "USER_DELETE") return "탈퇴";

  return "-";
};
