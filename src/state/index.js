import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const commentIdState = atom({
  key: "commentIdState",
  default: null,
});
