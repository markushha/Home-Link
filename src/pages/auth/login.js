/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import client from "../../../app/clients/client";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await client.post("/login", {
          username: username,
          password: password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("iin", response.data.user.iin);
      localStorage.setItem("zhk", response.data.user.zhk);
      localStorage.setItem("appartamentNumber", response.data.user.appartamentNumber);
      localStorage.setItem("phoneNumber", response.data.user.phoneNumber);
      localStorage.setItem("_id", response.data.user._id);
      localStorage.setItem("username", response.data.user.username);
      window.location.replace("/");
    } catch (err) {
      console.log(err.message);
    }
  };

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
                Имя пользователя
              </label>
              <input
                className="register-input"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Пароль
              </label>
              <input
                type="password"
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
            <button className="submit-button" onClick={() => {
              handleLogin();
            }}>Войти</button>
        </div>
      </div>
    </div>
  );
}
