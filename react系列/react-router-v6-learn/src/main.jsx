/* eslint-disable no-unused-vars */
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import './index.css';
import Root, {
  loader as rootLoader,
  action as rootAction
} from './routes/root';

import {
  loader as contactLoader,
  action as contactAction
} from './routes/contact';
import ErrorPage from './error-page';
import Contact from './routes/contact';
import Index from './routes/index';
import EditContact, { action as editAction } from './routes/edit';
import { action as destroyAction } from './routes/destroy';

//扁平化tree数据格式处理
const routerPlain = createBrowserRouter([
  {
    path: '/',
    // element: <div>Hello world!</div>
    element: <Root />,
    errorElement: <ErrorPage />, //响应错误时候出现的页面
    loader: rootLoader, //每次进入页面前相当于进行前置校验
    action: rootAction,
    children: [
      //嵌套页面
      {
        //这里设置<ErrorPage />主要为了向下兼容报错信息展示界面， 更加友好
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> }, //默认插槽填充页面
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div> //自定义当前路由错误边界组件
          }
        ]
      }
    ]
  }
  // {
  //   path: 'contacts/:contactId',
  //   element: <Contact />
  // }
]);

// jsx格式处理
const routerJsx = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={routerPlain} /> */}
    <RouterProvider router={routerJsx} />
  </React.StrictMode>
);
