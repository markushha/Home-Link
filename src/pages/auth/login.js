/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import client from "../../../app/clients/client";

export default function login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    try {
      const response = await client.post("/login", {
          phoneNumber: phoneNumber,
          password: password,
      });
      localStorage.setItem("token", response.data.token);
      window.location.replace("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="wrapper" onKeyDown={(e) => onKeyPress(e)}>
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
                value={phoneNumber}
                type="tel"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
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
