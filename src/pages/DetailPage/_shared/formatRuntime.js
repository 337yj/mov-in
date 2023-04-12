export const formatRuntime = (runtimeInMinutes) => {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;
  return `${hours}시간 ${minutes}분`;
};
