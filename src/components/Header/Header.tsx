import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './Header.scss';
import { logout } from '../../redux/reducers/authSlice';

export const Header = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="header-container">
        {isAuth && (
          <button
            type="button"
            className="header-btn"
            onClick={() => {
              dispatch(logout());
            }}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
