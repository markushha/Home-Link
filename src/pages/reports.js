/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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

  const [financeData, setFinanceData] = useState([]);
  const [error, setError] = useState(null);

  const getFinanceData = async () => {
    try {
      setError("");
      const res = await client.get("/getStatFinance");

      setAppartmentsMoney(res.data.finalAppartament);
      setEntranceMoney(res.data.finalEntrance);
      setFacadeMoney(res.data.finalFrontage);
      setBlagoustMoney(res.data.finalImprovment);
      setParkingMoney(res.data.finalParking);
      setTotalMoney(res.data.finalTotal);

      console.log(res.data.finalTotal);
    } catch (e) {
      setError(e.message);
    }
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
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getApplications();
    getFinanceData();
  }, []);

  if (!token) return <UnAuthorized />;

  return (
    <div className="wrapper">
      <Navbar />
      <div className="container mt-[100px]">
        <div className="flex flex-col items-center justify-center m-auto">
          <div className="m-auto w-[450px] h-[500px] items-center flex flex-col">
            <label className="mb-[20px] mt-[20px]">Статистика Вашего ЖК</label>
            <Pie data={data} options={options} />
          </div>

          <div className="m-auto w-[450px] h-[500px] items-center flex flex-col mt-[100px] mb-[80px]">
            <label className="mb-[20px] mt-[20px]">Финансовый отчет ОСИ</label>
            <Pie data={alphadata} options={options} />
            <div className="mb-[40px] mt-[20px]">
            <p className="text-[26px]">Общая сумма: <span className="font-bold cursor-pointer hover:underline text-[#7265FF]">{totalMoney}₸</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
