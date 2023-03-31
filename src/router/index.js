import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../components/Layout";

import {
  HomePage,
  ComponentPage,
  SearchResultPage,
  DetailPage,
  CommentPage,
  CommentDetailPage,
  LoginPage,
  RegisterPage,
  MyPage,
  UserInfo,
  Like,
  Bookmark,
  CommentAndRating,
} from "../pages";

const route = (
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="searchResult" element={<SearchResultPage />} />
    <Route path="detail" element={<DetailPage />} />
    <Route path="comment" element={<CommentPage />} />
    <Route path="commentDetail" element={<CommentDetailPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<RegisterPage />} />
    <Route path="myPage" element={<MyPage />}>
      <Route path="/myPage/userInfo" element={<UserInfo />} />
      <Route path="/myPage/comment" element={<CommentAndRating />} />
      <Route path="/myPage/like" element={<Like />} />
      <Route path="/myPage/bookmark" element={<Bookmark />} />
    </Route>
    <Route path="components" element={<ComponentPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
