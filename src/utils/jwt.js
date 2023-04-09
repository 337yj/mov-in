export const saveTokens = (token) => {
  localStorage.setItem("ACCESS_TOKEN", token.accessToken);
  localStorage.setItem("REFRESH_TOKEN", token.refreshToken);
};

export const getTokens = () => {
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  const refreshToken = localStorage.getItem("REFRESH_TOKEN");
  return {
    accessToken,
    refreshToken,
  };
};
