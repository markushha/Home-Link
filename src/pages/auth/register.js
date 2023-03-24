/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function register() {
  const [name, setName] = useState("");
  const [iin, setIin] = useState("");
  const [phone, setPhone] = useState("");
  const [whoIs, setWhoIs] = useState("");
  const [houseComplex, setHouseComplex] = useState("");
  const [appartment, setAppartment] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");
  const [step, setStep] = useState(0);

  return (
    <div className="wrapper">
      <Head>
        <title>Регистрация</title>
      </Head>
      <div className="container">
        {step === 0 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">
                ФИО
              </label>
              <input
                className="register-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="ИИН">
                ИИН
              </label>
              <input
                className="register-input"
                value={iin}
                onChange={(e) => {
                  setIin(e.target.value);
                }}
              ></input>
            </div>
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
            {error && (
              <div className="error">
                <label>{error}</label>
              </div>
            )}
            <div className="is-registered">
              <Link className="text-left" href={"/auth/login"}>
                Уже есть аккаунт? Войти
              </Link>
            </div>
            <button
              className="submit-button"
              onClick={() => {
                if (name.trim() && iin.trim() && phone.trim()) {
                  setError("");
                  setStep(1);
                  return;
                }
                setError("Заполните все поля");
              }}
            >
              Далее
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <label className="auth-subtitle">Кем вы являетесь?</label>
            <div className="options">
              <div
                className={`option mr-24 ${whoIs === "user" ? "active" : ""}`}
                onClick={() => {
                  setWhoIs("user");
                }}
              >
                <div className="option-image">
                  <Image
                    width="110"
                    height="110"
                    src="/icons/user.svg"
                    alt="user"
                  />
                </div>
                <label className="option-text">Жилец</label>
              </div>
              <div
                className={`option ${whoIs === "admin" ? "active" : ""}`}
                onClick={() => {
                  setWhoIs("admin");
                }}
              >
                <div className="option-image">
                  <Image
                    width="110"
                    height="110"
                    src="/icons/admin.svg"
                    alt="admin"
                  />
                </div>
                <label className="option-text">Член КСК</label>
              </div>
            </div>
            {error && (
              <div className="error">
                <label>{error}</label>
              </div>
            )}
            <div className="buttons">
              <button
                className="back-button"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                <Image
                  src="/icons/arrow-down.svg"
                  alt="arrow"
                  width="40"
                  height="40"
                  className="text-white"
                />
              </button>
              <button
                className="submit-button"
                onClick={() => {
                  if (whoIs) {
                    setError("");
                    setStep(2);
                    return;
                  }
                  setError("Выберите один из вариантов");
                }}
              >
                Далее
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">
                Ваш Жилой Комплекс
              </label>
              <input
                className="register-input"
                value={houseComplex}
                onChange={(e) => {
                  setHouseComplex(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="ИИН">
                Номер Квартиры
              </label>
              <input
                className="register-input"
                value={appartment}
                onChange={(e) => {
                  setAppartment(e.target.value);
                }}
              ></input>
            </div>
            {error && (
              <div className="error">
                <label>{error}</label>
              </div>
            )}
            <div className="buttons">
              <button
                className="back-button"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                <Image
                  src="/icons/arrow-down.svg"
                  alt="arrow"
                  width="40"
                  height="40"
                  className="text-white"
                />
              </button>
              <button
                className="submit-button"
                onClick={() => {
                  if (appartment.trim() && houseComplex.trim()) {
                    setError("");
                    setStep(3);
                    return;
                  }
                  setError("Заполните все поля");
                }}
              >
                Далее
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">
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
            <div className="form-group">
              <label className="auth-label" htmlFor="ИИН">
                Подтвердите пароль
              </label>
              <input
                className="register-input"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              ></input>
            </div>
            {error && (
              <div className="error">
                <label>{error}</label>
              </div>
            )}
            <div className="buttons">
              <button
                className="back-button"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                <Image
                  src="/icons/arrow-down.svg"
                  alt="arrow"
                  width="40"
                  height="40"
                  className="text-white"
                />
              </button>
              <button
                className="submit-button"
                onClick={() => {
                  if (
                    password.trim() &&
                    repeatPassword.trim() &&
                    password === repeatPassword
                  ) {
                    setError("");
                    setStep(3);
                    console.log(
                      name,
                      iin,
                      phone,
                      whoIs,
                      houseComplex,
                      appartment,
                      password,
                      repeatPassword
                    );
                    // window.location.pathname = "/auth/login";
                    return;
                  }
                  if (password !== repeatPassword) {
                    setError("Пароли не совпадают");
                    return;
                  }
                  setError("");
                  setError("Заполните все поля");
                }}
              >
                Далее
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
