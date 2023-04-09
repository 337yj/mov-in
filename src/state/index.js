import { atom } from "recoil";

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
  default: false,
});

export const commentsState = atom({
  key: "commentsState",
  default: [],
});

export const myCommentsState = atom({
  key: "myCommentsState",
  default: [],
});
