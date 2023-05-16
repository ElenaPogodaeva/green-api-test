import './App.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import { useAppSelector } from './hooks/hooks';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate('/login');
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
