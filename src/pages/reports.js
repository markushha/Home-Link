/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Meta from "../../app/utils/Meta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

Chart.register(ArcElement, Tooltip, Legend);

export default function reports() {
  const [token, setToken] = useState(null);

  const [totalApplications, setTotalApplications] = useState(0);
  const [newApplications, setNewApplications] = useState(0);
  const [activeApplications, setActiveApplications] = useState(0);
  const [completedApplications, setCompletedApplications] = useState(0);

  const [appartmentsMoney, setAppartmentsMoney] = useState(0);
  const [entranceMoney, setEntranceMoney] = useState(0);
  const [facadeMoney, setFacadeMoney] = useState(0);
  const [blagoustMoney, setBlagoustMoney] = useState(0);
  const [parkingMoney, setParkingMoney] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFinanceData = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await client.get("/getStatFinance");

      setAppartmentsMoney(res.data.finalAppartament);
      setEntranceMoney(res.data.finalEntrance);
      setFacadeMoney(res.data.finalFrontage);
      setBlagoustMoney(res.data.finalImprovment);
      setParkingMoney(res.data.finalParking);
      setTotalMoney(res.data.finalTotal);

      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
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
    });
    setTimeout(() => {
      setError("");
    }, 1000);
  };

  const data = {
    labels: ["Новые", "Активные", "Завершенные"],
    datasets: [
      {
        label: "Заявки",
        data: [newApplications, activeApplications, completedApplications],
        backgroundColor: ["#ABA4FF", "#484386", "#7265FF"],
      },
    ],
  };

  const options = {};

  const alphadata = {
    labels: ["Квартиры", "Подьезд", "Фасад", "Благоустройство", "Паркинг"],
    datasets: [
      {
        label: "Финансовый отчет ЖК",
        data: [
          appartmentsMoney,
          entranceMoney,
          facadeMoney,
          blagoustMoney,
          parkingMoney,
        ],
        backgroundColor: [
          "#484386",
          "#A8A5CB",
          "#302D54",
          "#141130",
          "#7265FF",
        ],
      },
    ],
  };

  const getApplications = async () => {
    try {
      setLoading(true);
      const res = await client.get("/getAppsData");

      res.data.map((application) => {
        setTotalApplications((prev) => prev + 1);
        if (application.status === 0) {
          setNewApplications((prev) => prev + 1);
        } else if (application.status === 1) {
          setActiveApplications((prev) => prev + 1);
        } else if (application.status === 3) {
          setCompletedApplications((prev) => prev + 1);
        }
      });
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getApplications();
    getFinanceData();
  }, []);

  if (!token) return <UnAuthorized />;
  if (loading) return <Loading />;

  return (
    <div className="wrapper">
      <Navbar />
      <Meta title="Отчетность" />
      <div className="container mt-[100px]">
        <div className="flex flex-col items-center justify-center m-auto">
          <div className="m-auto w-[450px] h-[500px] items-center flex flex-col">
            <label className="mb-[20px] mt-[20px]">Статистика Вашего ЖК</label>
            <Pie data={data} options={options} />
            <div className="mb-[40px] mt-[20px]">
              <p className="text-[26px]">
                Общее количество:{" "}
                <span className="font-bold cursor-pointer hover:underline text-[#7265FF]">
                  {totalApplications} заявок
                </span>
              </p>
            </div>
          </div>

          <div className="m-auto w-[450px] h-[500px] items-center flex flex-col mt-[100px] mb-[80px]">
            <label className="mb-[20px] mt-[20px]">Финансовый отчет ОСИ</label>
            <Pie data={alphadata} options={options} />
            <div className="mb-[40px] mt-[20px]">
              <p className="text-[26px]">
                Общая сумма:{" "}
                <span className="font-bold cursor-pointer hover:underline text-[#7265FF]">
                  {totalMoney}₸
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {error && showToast()}
      <ToastContainer />
    </div>
  );
}
