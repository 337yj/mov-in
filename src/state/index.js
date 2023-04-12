import { atom, selector } from "recoil";

//NOTE: atom => import { recoilPersist } from 'recoil-persist';
//NOTE: recoil  const [user, setUser] = useRecoilState(userState);
//NOTE: const user = useRecoilValue(userState); -> movieDetail/index.js , CommentDetail/index.js => 어디선가 setUser를 하면 둘 다 리렌더 됨.
export const userState = atom({
  key: "userState",
  default: null,
});

export const commentIdState = atom({
  key: "commentIdState",
  default: null,
});

export const myCommentState = atom({
  key: "myCommentState",
  default: {},
});
