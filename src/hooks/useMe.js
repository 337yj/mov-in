import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getUsersMe } from "../api/User";
import { userState } from "../state";

const useMe = () => {
  const [user, setUser] = useRecoilState(userState);

  // const onGetMe = async () => {
  //   const me = await getUsersMe();

  //   if (me.data) {
  //     setUser(me.data);
  //   }
  // };

  const onGetMe = async () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) return;

    try {
      const me = await getUsersMe();
      if (me.data) {
        setUser(me.data);
      }
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  useEffect(() => {
    onGetMe();
  }, [setUser]);

  return user;
};

export default useMe;
