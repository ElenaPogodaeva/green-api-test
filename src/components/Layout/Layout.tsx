import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.scss';

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
