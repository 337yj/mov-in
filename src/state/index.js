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

export const modalState = atom({
  key: "modalState",
  // default: {
  //   isOpen: false,
  //   movie: null,
  // },

  default: false,
});

export const commentsState = atom({
  key: "commentsState",
  default: [],
});

export const myCommentState = atom({
  key: "myCommentState",
  default: {},
});

export const deletedCommentIdsState = atom({
  key: "deletedCommentIdsState",
  default: [],
});

export const filteredCommentsSelector = selector({
  key: "filteredCommentsSelector",
  get: ({ get }) => {
    const comments = get(commentsState);
    const deletedCommentIds = get(deletedCommentIdsState);
    return comments.filter(
      (comment) => !deletedCommentIds.includes(comment.id),
    );
  },
});

// export const likedState = atom({
//   key: "likedState",
//   default: false,
// });
