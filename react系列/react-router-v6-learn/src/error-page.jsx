import { useRouteError } from 'react-router-dom';

//路由抛错页面
export default function ErrorPage() {
  //获取跳转页面的报错信息
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
