export const Login = () => {
  return (
    <form className="form">
      <h2 className="form-title">Авторизация</h2>
      <input
        type="text"
        className="input"
        placeholder="Введите idInstance"
        // value={idInstance}
        // onChange={handleChange}
      />
      <input
        type="text"
        className="input"
        placeholder="Введите apiTokenInstance"
        // value={apiTokenInstance}
        // onChange={handleChange}
      />
      <button type="submit" className="btn">
        Войти
      </button>
    </form>
  );
};

export default Login;
