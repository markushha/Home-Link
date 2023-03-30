/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import UnAuthorized from "@/components/UnAuthorized";
import Image from "next/image";
import LongBar from "@/components/LongBar";
import LongSlimBar from "@/components/LongSlimBar";
import client from "../../app/clients/client";
import Modal from "@/components/Modal";
import Meta from "../../app/utils/Meta";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function profile() {
  const [token, setToken] = useState("");
  
  const [zhk, setZhk] = useState("");
  const [appartamentNumber, setAppartamentNumber] = useState("");
  const [username, setUsername] = useState("");
  const [iin, setIin] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

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

  const addWorker = async (name, category, phoneNumber) => {
    try {
      if (!name || !category || !phoneNumber) return setError("Заполните все поля корректно");
      setLoading(true);
      await client.post("/addContact", {
        category: category,
        name: name,
        phoneNumber: phoneNumber,
      });
      setModal(false);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setAppartamentNumber(res.data.appartamentNumber);
      setZhk(res.data.zhk);
      setUsername(res.data.username);
      setIin(res.data.iin);
      setRole(res.data.role);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getUserData();
  }, []);

  if (!token) return <UnAuthorized />;
  if (loading) return <Loading />;

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
              <Link href="/developing"><Image className="cursor-pointer" alt="settings" src="/icons/settings-fill.svg" width="44" height="44"/></Link>
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
            <LongBar title={`${zhk}, квартира ${appartamentNumber}`} />
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
            <Link href="/developing"><LongSlimBar title="История запросов"/></Link>
            <Link href="/developing"><LongSlimBar title="Личные коммунальные счета"/></Link>
            <Link href="/developing"><LongSlimBar title="Текущий и капитальный ремонт общего имущества"/></Link>
            <Link href="/developing"><LongSlimBar title="Действующая кварплата"/></Link>
            <Link href="/developing"><LongSlimBar title="Получение квитанции  за оплату коммунальных услуг"/></Link>
            <Link href="/developing"><LongSlimBar title="Oбщедомовой тариф"/></Link>
          </div>
        </div>
      </div>
      {error && showToast()}
      <Modal active={modal} setActive={setModal} onClick={addWorker} profile={true} />
      <ToastContainer />
    </div>
  );
}
