import { useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import './style.css';

// eslint-disable-next-line react/prop-types
export default function Root() {
  const data = useLoaderData();
  console.log('data', data);
  return (
    <div className="side">
      <div className="left">
        <h1>我是Root外层包裹组件</h1>
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
}
