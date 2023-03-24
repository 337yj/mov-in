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
  MyPage,
  UserInfo,
  Comment,
  Like,
  Bookmark,
} from "../pages";

const route = (
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="searchResult" element={<SearchResultPage />} />
    <Route path="myPage" element={<MyPage />}>
      <Route path="/myPage/userInfo" element={<UserInfo />} />
      <Route path="/myPage/comment" element={<Comment />} />
      <Route path="/myPage/like" element={<Like />} />
      <Route path="/myPage/bookmark" element={<Bookmark />} />
    </Route>
    <Route path="components" element={<ComponentPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
