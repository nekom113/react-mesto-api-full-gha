import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg'

export default function Header({ userEmail, onSignOut }) {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className='header__columns'>
        <img src={headerLogo} alt="логотип" className="header__logo" />

        {pathname === '/' &&
          <div className='header__right-container'>
            <p className='header__email'>{userEmail}</p>
            <button onClick={onSignOut} className='header__exit-btn'>
              Выйти
            </button>
          </div>
        }
        {pathname === '/sign-in' &&
          <Link to='/sign-up' className='header__link'>
            Регистрация
          </Link>
        }
        {pathname === '/sign-up' &&
          <Link to='/sign-in' className='header__link'>
            Войти
          </Link>
        }
      </div>
    </header>
  )
}
