import { useLoaderData } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MenuLink from './MenuLink';
import './style.css';

// eslint-disable-next-line react/prop-types
export default function Root() {
  const data = useLoaderData();
  console.log('data', data);
  return (
    <div className="side">
      <div className="left">
        <MenuLink />
      </div>
      <div className="right">
        <Outlet />
      </div>
    </div>
  );
}
