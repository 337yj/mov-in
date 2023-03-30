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
    <Route path="detail/:id" element={<DetailPage />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<RegisterPage />} />
    <Route path="myPage" element={<MyPage />}>
      <Route path="userInfo" element={<UserInfo />} />
      <Route path="comment" element={<CommentAndRating />} />
      <Route path="like" element={<Like />} />
      <Route path="bookmark" element={<Bookmark />} />
    </Route>
    <Route path="components" element={<ComponentPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
