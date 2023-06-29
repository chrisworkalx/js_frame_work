import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import Root from '../Layout/Root';
import AuthLayout from '../Layout/AuthLayout';
import Home from '../pages/Home';
import TestModal from '../pages/TestModal';
import TestUrlParams from '../pages/TestUrlParams';

const routes = (
  <Route
    path="/"
    loader={async ({ request }) => {
      // loaders can be async functions
      const res = await fetch('/test.json', {
        signal: request.signal
      });
      const user = await res.json();
      console.log('user', user);
      return user;
    }}
    element={<Root />}
  >
    <Route path="home" element={<Home />} />
    <Route path="testUrlParam" element={<TestUrlParams />} />

    <Route element={<AuthLayout />}>
      <Route path="modal" element={<TestModal />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));
console.log('router', router);

export default <RouterProvider router={router} />;
