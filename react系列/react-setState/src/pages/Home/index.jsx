import { Link, useNavigation } from 'react-router-dom';

export default function Home() {
  const navigation = useNavigation();
  console.log('navigation', navigation);
  return (
    <div>
      <h1>这是首页</h1>
      <Link to="/modal">modal</Link>
    </div>
  );
}
