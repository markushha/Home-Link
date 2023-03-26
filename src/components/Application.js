import React from "react";
import client from "../../app/clients/client";

function Application({ title, status, price, createdAt, updatedAt, id, sender, phoneNumber }) {
  if (status === 0) status = "Новая заявка";
  else if (status === 1) status = "Активная заявка";
  else if (status === 2) status = "Отклоненная заявка";
  else if (status === 3) status = "Завершенная заявка";

  const handleAccept = async () => {
    try {
      await client.post("/updateappstatus", {
        id: id,
        status: 1,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleFinish = async () => {
    try {
      await client.post("/updateappstatus", {
        id: id,
        status: 3,
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="wrapper">
      <div className="flex items-center justify-center w-[100%]">
        <div className="application">
          <div className="content">
            <div className="flex flex-col items-center justify-center top-app">
              <div className="application-contacts">
                <label className="text-[#7265FF] cursor-pointer">ФИО: <span className="font-semibold hover:underline">{sender}</span></label>
                <label className="text-[#7265FF] cursor-pointer">Номер Телефона: <span className="font-semibold hover:underline">{phoneNumber}</span></label>
              </div>
              <div className="application-info">
                <label className="cursor-pointer">Проблема: {title}</label>
                <label className="cursor-pointer">Статус: <span className={`text-green-500`}>{status}</span></label>
                <label className="cursor-pointer">Предложенная цена: <span className={`text-blue-400 hover:underline`}>{price}₸</span></label>
            </div>
            </div>

              <div className="buttons-app">
              {status === "Новая заявка" && <button className="decline-btn mr-[20px]">Отклонить</button>}
              {status === "Новая заявка" && (
                <button className="accept-btn" onClick={() => handleAccept()}>Принять</button>
              )}
              {status === "Активная заявка" && (
                <button className="accept-btn" onClick={() => handleFinish()}>Завершить</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Application;
