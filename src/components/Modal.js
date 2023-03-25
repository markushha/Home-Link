import Link from "next/link";
import React from "react";

function Modal({ active, setActive }) {
  return (
    <div 
    onClick={() => setActive(false)}
    className={active ? "modal active" : "modal"}>
      <div 
      onClick={(e) => e.stopPropagation()}
      className="w-[680px] h-[400px] rounded-[10px] flex flex-col items-center justify-center bg-white opacity-[1]">
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
    </div>
  );
}

export default Modal;
