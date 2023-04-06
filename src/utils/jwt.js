export const saveTokens = (token) => {
  localStorage.setItem("accessToken", token.accessToken);
  localStorage.setItem("refreshToken", token.refreshToken);
};

export const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return {
    accessToken,
    refreshToken,
  };
};
