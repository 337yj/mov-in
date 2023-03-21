import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import { ComponentPage, HomePage } from '../pages';

const route = (
  <Route path="/">
    <Route index element={<HomePage />} />
    <Route path="components" element={<ComponentPage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;