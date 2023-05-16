import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login, setLoginData } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { idInstance, apiTokenInstance, isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    dispatch(setLoginData({ name, value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(login());
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Авторизация</h2>
      <input
        type="text"
        className="input"
        name="idInstance"
        placeholder="Введите IdInstance"
        value={idInstance}
        onChange={handleChange}
      />
      <input
        type="text"
        className="input"
        name="apiTokenInstance"
        placeholder="Введите ApiTokenInstance"
        value={apiTokenInstance}
        onChange={handleChange}
      />
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
};

export default Login;
