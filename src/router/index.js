import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
  
  import { HomePage } from "../pages";
  
  //MEMO: 1) :id 와 같이 path variable을 사용한 route
  //MEMO: 2) 중첩 routing
  
  const route = (
    <Route path="/">
      <Route index element={<HomePage />} />
    </Route>
  );
  
  /**
   * createBrowserRouter
   * => router 정보를 기반으로 BrowserRouter로 감싸서 return
   * createRoutesFromElements
   * => Route태그로 감싸져있는 routing 정보들을 route 객체로 변환.
   *  */
  const rootRouter = createBrowserRouter(createRoutesFromElements(route));
  export default rootRouter;