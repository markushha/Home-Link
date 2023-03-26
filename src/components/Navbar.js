import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";

function Navbar() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setRole(res.data.role);
    } catch (err) {
      console.log(err.message);
    }
  }

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
       <Link href="/"><label className="logo-text">HomeLink</label></Link>
      </div>
      <div className="middle-menu">
        <div className="menu-item">
          <Link href="/contacts">Контакты</Link>
        </div>
        <div className="menu-item">
          <Link href="/requests">Заявки</Link>
        </div>
        <div className="menu-item">
            <Link href="/reports">Отчетность</Link>
          </div>
          {role === "admin" && (
          <div className="menu-item">
            <Link href="/adminPanel">См. Заявки</Link>
          </div>
        )}
      </div>
      {token && (
        <div className="right-menu">
          <div className="nav-icon">
            <Link href="/requests">
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
            <Link href="/auth/login">Вход</Link>
          </div>
          <div className="auth-item">
            <Link href="/auth/register">Регистрация</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
