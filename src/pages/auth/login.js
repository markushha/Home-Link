/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapper">
      <Head>
        <title>Вход</title>
      </Head>
      <div className="container">
        <div className="form">
          <label className="auth-title">Вход</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Номер телефона
              </label>
              <input
                className="register-input"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Пароль
              </label>
              <input
                className="register-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <div className="is-registered">
              <label>
                <Link href={"/auth/register"}>Нет аккаунта? Регистрация</Link>
              </label>
            </div>
            <button className="submit-button" onClick={() => {}}>Войти</button>
        </div>
      </div>
    </div>
  );
}
