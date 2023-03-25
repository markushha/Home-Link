/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import UnAuthorized from "@/components/UnAuthorized";
import Meta from "../../app/utils/Meta";
import { useState, useEffect } from "react";
import Image from "next/image";
import LongBar from "@/components/LongBar";
import client from "../../app/clients/client";
import Bar from "@/components/Bar";
import { v4 as uuidv4 } from "uuid";

function Requests() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState(null);
  const [problem, setProblem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const getUserData = async () => {
    try {
      const res = await client.post("/getuserdata", {
        token: localStorage.getItem("token"),
      });
      setResponse(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const searchHandler = () => {
    console.log(search);
    setSearch("");
  };

  const requestApplication = async () => {
    try {
      const res = await client.post("/create", {
        id: uuidv4(),
        title: problem,
        category: category,
        price: price,
        status: 0,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getUserData();
  }, []);

  if (!token) return <UnAuthorized />;

  return (
    <>
      <Meta title="Заявки" />
      <div className="wrapper">
        <Navbar />
        <div className="flex items-center justify-center w-[80%] mt-[100px]">
          <div className="flex-col flex items-center justify-center w-[100%]">
            <div className="top">
              <div className="search">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Поиск..."
                  className="outline-none bg-[#F5F5F5] ml-8 w-full h-10"
                />
                <Image
                  onClick={() => searchHandler()}
                  src="/icons/search.svg"
                  className="mr-8 cursor-pointer"
                  alt="search"
                  width={28}
                  height={28}
                />
              </div>
              <div className="w-[100%]">
                {/* <LongBar title={`ЖК ${response.zhk}, квартира ${response.appartamentNumber}`} /> */}
              </div>
            </div>
            <div className="middle">
              <div className="mt-[40px] self-start">
                <label className="text-[24px]">
                  Выберите категорию вашей проблемы
                </label>
              </div>
              <div className="mt-[20px] category-bars ">
                <Bar
                  active={category === "Квартира" ? true : false}
                  onClick={() => {
                    setCategory("Квартира");
                  }}
                  title={"Квартира"}
                  path={"/icons/app.svg"}
                />
                <Bar
                  active={category === "Подьезд" ? true : false}
                  onClick={() => {
                    setCategory("Подьезд");
                  }}
                  title={"Подьезд"}
                  path={"/icons/ladder.svg"}
                />
                <Bar
                  active={category === "Паркинг" ? true : false}
                  onClick={() => {
                    setCategory("Паркинг");
                  }}
                  title={"Паркинг"}
                  path={"/icons/car.svg"}
                />
                <Bar
                  active={category === "Фасад" ? true : false}
                  onClick={() => {
                    setCategory("Фасад");
                  }}
                  title={"Фасад"}
                  path={"/icons/trowel.svg"}
                  size={50}
                />
                <Bar
                  active={category === "Благоустройство" ? true : false}
                  onClick={() => {
                    setCategory("Благоустройство")
                  }}
                  title={"Благоустройство"}
                  path={"/icons/plant.svg"}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[100%] mt-[100px]">
              <div className="input-request">
                <input
                  type="text"
                  placeholder="Опишите вашу проблему..."
                  className="outline-none bg-[#F5F5F5] w-full ml-6"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                />
              </div>
              <div className="input-request">
                <input
                  type="text"
                  placeholder="Категория"
                  className="outline-none bg-[#F5F5F5] w-full ml-6"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="input-request">
                <input
                  type="text"
                  placeholder="Стоимость"
                  className="outline-none bg-[#F5F5F5] w-full ml-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button
                className="request-btn"
                onClick={() => {
                  requestApplication();
                }}
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Requests;
