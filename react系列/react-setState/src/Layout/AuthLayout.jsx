// eslint-disable-next-line react/prop-types

import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <>
      <h1>AuthLayout? ok!</h1>
      <Outlet />
    </>
  );
}
