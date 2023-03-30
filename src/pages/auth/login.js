/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import client from "../../../app/clients/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import InputMask from "react-input-mask";
import Loading from "@/components/Loading";

export default function login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
    })
    setTimeout(() => {
      setError("");
    }, 1000);
  }

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await client.post("/login", {
        phoneNumber: phoneNumber,
        password: password,
      });
      localStorage.setItem("token", response.data.token);
      window.location.replace("/");
      setLoading(false);
      toast.success('Вы успешно вошли в систему!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="wrapper" onKeyDown={(e) => onKeyPress(e)}>
        <Head>
          <title>Вход</title>
        </Head>
        <Navbar />
        <div className="container">
          <div className="form">
            <label className="auth-title">Вход</label>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Номер телефона
              </label>
              <InputMask
                mask="+7 (999) 999 99 99"
                placeholder="Номер телефона"
                className="register-input"
                maskChar=""
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Пароль
              </label>
              <input
                type="password"
                placeholder="Ваш пароль"
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
            <button
              className="submit-button"
              onClick={() => {
                if (phoneNumber.trim() && password.trim()) {
                  return handleLogin();
                }
                setError("Заполните все поля");
              }}
            >
              Войти
            </button>
          {error &&
            showToast()
            }
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
