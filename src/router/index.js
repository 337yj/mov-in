import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Layout from '../components/Layout';

import { HomePage, SearchResultPage } from '../pages';

const route = (
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="searchResult" element={<SearchResultPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
