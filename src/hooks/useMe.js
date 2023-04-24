import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getUsersMe } from "../api/User";
import { userState } from "../state";

const useMe = () => {
  const [user, setUser] = useRecoilState(userState);

  const onGetMe = async () => {
    const me = await getUsersMe();

    if (me.data) {
      setUser(me.data);
    }
  };

  useEffect(() => {
    onGetMe();
  }, [setUser]);

  return user;
};

export default useMe;
