import Link from "next/link";
import { useState, useEffect } from "react";
import InputMask from "react-input-mask";


function Modal({ active, setActive, profile, onClick }) {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <div
      onClick={() => setActive(false)}
      className={active ? "modal active" : "modal"}
    >
      {!profile && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[680px] h-[400px] rounded-[10px] flex flex-col items-center justify-center bg-white opacity-[1]"
        >
          <label className="text-[24px] text-green-500 font-[500]">
            Ваша заявка успешно отправлена!
          </label>
          <div className="mt-[40px] mb-[40px]">
            <label className="text-[20px] font-regular">
              Можете следить за статусом в своем{" "}
              <Link
                className="text-[#7265FF]  hover:underline "
                href={"/profile"}
              >
                Личном кабинете.
              </Link>
            </label>
          </div>
          <button onClick={() => setActive(false)} className="request-btn">
            Закрыть
          </button>
        </div>
      )}
      {profile && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[680px] h-[580px] rounded-[10px] flex flex-col items-center justify-center bg-white opacity-[1]"
        >
          <div className="form">
            <label className="auth-title">Добавление работника</label>
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
                Имя
              </label>
              <input
                placeholder="Иван"
                type="text"
                className="register-input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group">
              <label className="auth-label" htmlFor="phone">
                Категория работника
              </label>
              <input
                placeholder="Электрик"
                type="text"
                className="register-input"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              ></input>
            </div>
            <button
              className="submit-button"
              onClick={() => {
                onClick(name, category, phoneNumber);
              }}
            >
              Добавить работника
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
