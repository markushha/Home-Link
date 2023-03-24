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
              <label>
                {error}
              </label>
            </div>
            )}
            <div className="is-registered">
                <Link className="text-left" href={"/auth/login"}>Уже есть аккаунт? Войти</Link>
            </div>
            <button className="submit-button" onClick={() => {
              if (name.trim() && iin.trim() && phone.trim()) {
                setError("");
                setStep(1);
                return;
              }
              setError("Заполните все поля");
            }}>Далее</button>
        </div>
        )}
        {step === 1 && (
          <div className="form">
            <label className="auth-title">Регистрация</label>
            <label className="auth-subtitle">Кем вы являетесь?</label>
            <div className="options">
              <div className={`option mr-24 ${whoIs === "user" ? "active" : ""}`} onClick={() => {
                setWhoIs("user");
              }}>
                <div className="option-image">
                  <Image width="110" height="110" src="/user.svg" alt="user"/>
                </div>
                <label className="option-text">Жилец</label>
              </div> 
              <div className={`option ${whoIs === "admin" ? "active" : ""}`} onClick={() => {
                setWhoIs("admin");
              }}>
                <div className="option-image">
                    <Image width="110" height="110" src="/admin.svg" alt="admin"/>
                  </div>
                  <label className="option-text">Участник КСК</label>
                </div>
            </div>
            {error && (
              <div className="error">
              <label>
                {error}
              </label>
            </div>
            )}
            <button className="submit-button" onClick={() => {
              if (whoIs) {
                setError("");
                setStep(2);
                return;
              }
              setError("Заполните все поля");
            }}>Далее</button>
          </div>
        )}
      </div>
    </div>
  );
}