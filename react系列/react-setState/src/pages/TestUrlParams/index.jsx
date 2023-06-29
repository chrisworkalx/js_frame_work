import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function TestUrlParams() {
  const params = useParams();
  const [defaultColor] = useState({
    color: 'red'
  });

  return (
    <>
      <div>这是动态路由测试</div>
      <p style={defaultColor}>{params.id}</p>
    </>
  );
}
