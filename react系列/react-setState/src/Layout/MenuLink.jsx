import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const routesNames = [
  {
    route: 'home',
    name: 'Home'
  },
  {
    route: 'testUrlParam',
    name: '路由参数'
  },
  {
    route: 'hook',
    name: 'Hook测试'
  },
  {
    route: 'antd',
    name: 'Antd组件'
  }
];
export default function MenuLink() {
  const spaceLen = useMemo(() => {
    return <>&nbsp;{'🌟'}&nbsp;</>;
  }, []);
  return (
    <>
      {routesNames.map((r) => {
        return (
          <NavLink
            key={r.route}
            to={r.route}
            className={({ isActive, isPending }) =>
              isActive
                ? 'link-active'
                : isPending
                ? 'link-pending'
                : 'link-normal'
            }
          >
            {r.name} {spaceLen}
          </NavLink>
        );
      })}
    </>
  );
}
