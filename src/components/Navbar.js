import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

function Navbar() {
  const [token, setToken] = useState(null);

  useEffect(() => {
      setToken(localStorage.getItem("token"));
  }, [])

  return (
    <nav>
      <div className="logo-group">
        <Image
          className="logo-nav"
          src="/icons/logo.svg"
          alt="logo"
          width="55"
          height="49"
        />
        <label className="logo-text">HomeLink</label>
      </div>
      <div className="middle-menu">
        <div className="menu-item">
          <Link href="/">Главная</Link>
        </div>
        <div className="menu-item">
          <Link href="/contacts">Контакты</Link>
        </div>
        <div className="menu-item">
          <Link href="/reports">Отчетность</Link>
        </div>
        <div className="menu-item">
          <Link href="/requests">Заявки</Link>
        </div>
      </div>
      {token && (
        <div className="right-menu">
          <div className="nav-icon">
            <Link href="notifications">
              <Image
                src="/icons/notifs.svg"
                alt="notifications"
                width="44"
                height="44"
              />
            </Link>
          </div>
          <div className="nav-icon">
            <Link href="/profile">
              <Image
                src="/icons/desktop.svg"
                alt="notifications"
                width="44"
                height="44"
              />
            </Link>
          </div>
        </div>
      )}
      {!token && (
        <div className="right-menu">
          <div className="auth-item">
            <Link href="/auth/login">
            Вход
            </Link>
          </div>
          <div className="auth-item">
          <Link href="/auth/register">
            Регистрация
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
