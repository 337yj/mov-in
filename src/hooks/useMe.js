import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getUsersMe } from "../api/User";
import { userState } from "../state";

//NOTE: 커스텀 훅
// const useMe = () => {
//   const [me, setMe] = useState(null);

//   const onGetMe = async () => {
//     const me = await getUsersMe();
//     if (me.data) {
//       setMe(me.data);
//       // console.log(me);
//     }
//   };

//   useEffect(() => {
//     onGetMe();
//   }, []);

//   return me;
// };

// export default useMe;

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
