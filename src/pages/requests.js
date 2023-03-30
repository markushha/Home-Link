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
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Requests() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");
  const [problem, setProblem] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Категория");
  
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [zhk, setZhk] = useState();
  const [appartamentNumber, setAppartamentNumber] = useState();
  const [username, setUsername] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

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

  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setAppartamentNumber(res.data.appartamentNumber);
      setZhk(res.data.zhk);
      setPhoneNumber(res.data.phoneNumber);
      setUsername(res.data.username);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const searchHandler = () => {
    console.log(search);
    setSearch("");
  };

  const requestApplication = async () => {
    try {
      setLoading(true);
      const res = await client.post("/create", {
        id: uuidv4(),
        title: problem,
        category: category,
        price: price,
        status: 0,
        sender: username,
        phoneNumber: phoneNumber,
      });

      localStorage.setItem("application_id", res.data.id);

      setPrice("");
      setProblem("");
      setCategory("");
      setPrice("");
      setModal(true);
      setError("");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setZhk(localStorage.getItem("zhk"));
    setAppartamentNumber(localStorage.getItem("appartamentNumber"));
    getUserData();
  }, []);

  if (!token) return <UnAuthorized />;
  if (loading) return <Loading />;

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
                <LongBar title={`${zhk}, квартира ${appartamentNumber}`} />
              </div>
            </div>
            <div className="middle-req">
              <div className="flex items-center justify-center self-start">
                <label className="text-[24px]">
                  Выберите категорию вашей проблемы
                </label>
              </div>
              <div className="mt-[20px] category-bars">
                <div
                  onClick={() => {
                    setCategory("Квартира");
                  }}
                >
                  <Bar
                    active={category === "Квартира" ? true : false}
                    title={"Квартира"}
                    path={"/icons/app.svg"}
                  />
                </div>
                <div
                  onClick={() => {
                    setCategory("Подьезд");
                  }}
                >
                  <Bar
                    active={category === "Подьезд" ? true : false}
                    title={"Подьезд"}
                    path={"/icons/ladder.svg"}
                  />
                </div>
                <div
                  onClick={() => {
                    setCategory("Паркинг");
                  }}
                >
                  <Bar
                    active={category === "Паркинг" ? true : false}
                    title={"Паркинг"}
                    path={"/icons/car.svg"}
                  />
                </div>
                <div
                  onClick={() => {
                    setCategory("Фасад");
                  }}
                >
                  <Bar
                    active={category === "Фасад" ? true : false}
                    title={"Фасад"}
                    path={"/icons/trowel.svg"}
                    size={50}
                  />
                </div>
                <div
                  onClick={() => {
                    setCategory("Благоустройство");
                  }}
                >
                  <Bar
                    active={category === "Благоустройство" ? true : false}
                    title={"Благоустройство"}
                    path={"/icons/plant.svg"}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[100%] mt-[56px] mb-[50px]">
            <div className="input-request">
                <div className="outline-none bg-[#F5F5F5] w-full ml-6">
                  <p>{category}</p>
                </div>
              </div>
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
                  placeholder="Стоимость"
                  className="outline-none bg-[#F5F5F5] w-full ml-6"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              {error && showToast()}
              <button
                className="request-btn"
                onClick={() => {
                  if (category === "Категория") return setError("Выберите категорию");
                  {if (category.trim() && problem.trim() && price.trim()) {
                    setError("");
                    requestApplication();
                  }};
                  return setError("Заполните все поля");
                }}
              >
                Отправить заявку
              </button>

            </div>
          </div>
        </div>
      </div>
      <Modal active={modal} setActive={setModal} profile={false}/>
      <ToastContainer />
    </>
  );
}

export default Requests;
