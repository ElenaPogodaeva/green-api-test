import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues } from '../../types/types';

export const Login = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const onSubmit: SubmitHandler<LoginFormValues> = (data): void => {
    dispatch(login(data));
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="form-title">Авторизация</h2>
      {errors?.idInstance && <span className="form-error">* idInstance invalid</span>}
      <input
        type="text"
        className="input"
        placeholder="Введите IdInstance"
        {...register('idInstance', { required: true, pattern: /^\d{10}$/ })}
      />
      {errors?.apiTokenInstance && <span className="form-error">* apiTokenInstance invalid</span>}
      <input
        type="text"
        className="input"
        placeholder="Введите ApiTokenInstance"
        {...register('apiTokenInstance', { required: true, pattern: /^[A-Za-z0-9]+$/i })}
      />
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
};

export default Login;
