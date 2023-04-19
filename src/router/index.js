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
  //Profile,
  UserInfo,
  Like,
  Bookmark,
  CommentAndRating,
  BOPage,
  BOUser,
  BOComment,
  AdminLoginPage,
  AdminRegisterPage,
} from "../pages";

const route = (
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="searchResult" element={<SearchResultPage />} />
    <Route path="detail/:id" element={<DetailPage />} />
    <Route path="commentList/:id" element={<CommentPage />} />
    <Route path="commentDetail/:id" element={<CommentDetailPage />} />
    <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="adminLogin" element={<AdminLoginPage />} />
      <Route path="adminRegister" element={<AdminRegisterPage />} />
    </Route>
    <Route path="myPage" element={<MyPage />}>
      <Route path="userInfo" element={<UserInfo />} />
      <Route path="comment" element={<CommentAndRating />} />
      <Route path="like" element={<Like />} />
      <Route path="bookmark" element={<Bookmark />} />
    </Route>
    {/* <Route path="myPage/:id" element={<Profile />} /> */}
    <Route path="boPage" element={<BOPage />}>
      <Route path="boUser" element={<BOUser />} />
      <Route path="boComment" element={<BOComment />} />
    </Route>
    <Route path="components" element={<ComponentPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
