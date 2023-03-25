/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import UnAuthorized from "@/components/UnAuthorized";
import Image from "next/image";
import LongBar from "@/components/LongBar";
import LongSlimBar from "@/components/LongSlimBar";
import Link from "next/link";
import client from "../../app/clients/client";

export default function profile() {
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState({});

  const getUserData = async () => {
    try {
      const res = await client.post("/getuserdata", {
        token: localStorage.getItem("token"),
      });
      setResponse(res.data);
      localStorage.setItem("role", res.data.role);
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
                <label className="name-title">{response.username}</label>
                <label className="name-title">ИИН: {response.iin}</label>
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
                  localStorage.removeItem("iin");
                  localStorage.removeItem("username");
                  localStorage.removeItem("zhk");
                  localStorage.removeItem("appartamentNumber");
                  localStorage.removeItem("role");
                  localStorage.removeItem("phoneNumber");
                  localStorage.removeItem("_id");
                  window.location.href = "/";
                }}
              />
            </div>
          </div>
          <div className="main">
            <LongBar title={`ЖК ${response.zhk}, квартира ${response.appartamentNumber}`} />
            <LongBar
              title={
                <Link href="/register">
                  <label className="text-[#7265FF] hover:underline cursor-pointer">
                    Добавить жилой комплекс
                  </label>
                </Link>
              }
            />
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
    </div>
  );
}
