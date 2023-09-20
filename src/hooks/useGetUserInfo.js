export const useGetUserInfo = () => {
  const { userName, userPhoto, userId, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {};

  return {
    userName,
    userPhoto,
    userId,
    isAuth,
  };
};
