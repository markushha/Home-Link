/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import client from "../../../app/clients/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import InputMask from "react-input-mask";
import Loading from "@/components/Loading";

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
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await client.post("/registration", {
        username: name,
        iin: iin,
        phone,
        role: whoIs,
        zhk: houseComplex,
        appartamentNumber: appartment,
        password: password,
        phoneNumber: phone,
        budget: 0,
      });
      window.location.replace("/auth/login");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  const showToast = () => {
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setError("");
    }, 1000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wrapper">
      <Head>
        <title>Регистрация</title>
      </Head>
      <Navbar />
      <div className="container">
        {step === 0 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">
                ФИО
              </label>
              <input
                placeholder="Иванов Иван ?"
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
                placeholder="12-ти значный ИИН"
                className="register-input"
                value={iin}
                maxLength="12"
                onChange={(e) => {
                  setIin(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Номер телефона
              </label>
              <InputMask
                mask="+7 (999) 999 99 99"
                placeholder="Номер телефона"
                className="register-input"
                maskChar=""
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
            {error && showToast()}
            <div className="is-registered">
              <Link className="text-left" href={"/auth/login"}>
                Уже есть аккаунт? Войти
              </Link>
            </div>
            <button
              className="submit-button"
              onClick={() => {
                if (
                  name.trim() &&
                  iin.trim() &&
                  phone.trim() &&
                  iin.length === 12
                ) {
                  setError("");
                  setStep(1);
                  return;
                }
                setError("Заполните все поля корректно");
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
                <label className="option-text">Член ОСИ</label>
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
                placeholder="Например: ЖК 'Алматы'"
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
                placeholder="Например: 147"
                className="register-input"
                value={appartment}
                onChange={(e) => {
                  setAppartment(e.target.value);
                }}
              />
            </div>
            {error && showToast()}
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
                  setError("Заполните все поля корректно");
                }}
              >
                Далее
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="form" onKeyDown={(e) => onKeyPress(e)}>
            <label className="auth-title">Регистрация</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="name">
                Пароль
              </label>
              <input
                placeholder="Введите пароль от 4х до 10 символов"
                type="password"
                className="register-input"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="ИИН">
                Подтвердите пароль
              </label>
              <input
                placeholder="Подтвердите пароль"
                type="password"
                className="register-input"
                value={repeatPassword}
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
              />
            </div>
            {error && showToast()}
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
                  if (password !== repeatPassword) {
                    setError("Пароли не совпадают");
                    return;
                  }
                  if (password.length < 4 || password.length > 10) {
                    setError("Пароль должен быть от 4 до 10 символов");
                    return;
                  }
                  if (
                    password.trim() &&
                    repeatPassword.trim() &&
                    4 <= password.length <= 10  &&
                    password === repeatPassword
                  ) {
                    setError("");
                    handleRegister();
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
      <ToastContainer />
    </div>
  );
}
