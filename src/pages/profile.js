/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import UnAuthorized from "@/components/UnAuthorized";
import Image from "next/image";
import LongBar from "@/components/LongBar";
import LongSlimBar from "@/components/LongSlimBar";
import Link from "next/link";
import client from "../../app/clients/client";
import Modal from "@/components/Modal";
import Meta from "../../app/utils/Meta";

export default function profile() {
  const [token, setToken] = useState(null);
  
  const [zhk, setZhk] = useState(null);
  const [appartamentNumber, setAppartamentNumber] = useState(null);
  const [username, setUsername] = useState(null);
  const [iin, setIin] = useState(null);
  const [role, setRole] = useState(null);

  const [modal, setModal] = useState(false);

  const addWorker = async (name, category, phoneNumber) => {
    try {
      await client.post("/addContact", {
        category: category,
        name: name,
        phoneNumber: phoneNumber,
      });
      setModal(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  const getUserData = async () => {
    try {
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setAppartamentNumber(res.data.appartamentNumber);
      setZhk(res.data.zhk);
      setUsername(res.data.username);
      setIin(res.data.iin);
      setRole(res.data.role);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getUserData();
  }, []);

  if (!token) return <UnAuthorized />;

  return (
    <div className="wrapper">
      <Navbar />
      <Meta title="Личный кабинет" />
      <div className="flex items-center w-[80%] mt-[120px]">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="top-profile">
            <div className="flex items-center justify-center">
              <Image
                src="/icons/account.svg"
                alt="account"
                width="100"
                height="100"
              />
              <div className="text-block">
                <label className="name-title">{username}</label>
                <label className="name-title">ИИН: {iin}</label>
              </div>
            </div>
            <div className="flex items-center justify-center]">
              <Image className="cursor-pointer" alt="settings" src="/icons/settings-fill.svg" width="44" height="44"/>
              <Image
              className="ml-[16px] cursor-pointer"
                src="/icons/quit-icon.svg"
                alt="account"
                width="44"
                height="44"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  window.location.href = "/";
                }}
              />
            </div>
          </div>
          <div className="main">
            <LongBar title={`ЖК ${zhk}, квартира ${appartamentNumber}`} />
            {role === "admin" && (<LongBar
              title={
                <div onClick={() => {setModal(true)}}>
                  <label className="text-[#7265FF] hover:underline cursor-pointer">
                    Добавить контакт работника ЖК
                  </label>
                </div>
              }
            />)}
          </div>
          <div className="bottom mb-[40px]">
            <LongSlimBar title="История запросов"/>
            <LongSlimBar title="Личные коммунальные счета"/>
            <LongSlimBar title="Текущий и капитальный ремонт общего имущества"/>
            <LongSlimBar title="Действующая кварплата"/>
            <LongSlimBar title="Получение квитанции  за оплату коммунальных услуг"/>
            <LongSlimBar title="Oбщедомовой тариф"/>
          </div>
        </div>
      </div>
      <Modal active={modal} setActive={setModal} onClick={addWorker} profile={true} />
    </div>
  );
}
