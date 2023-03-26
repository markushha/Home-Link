/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "@/components/Navbar";
import Tab from "@/components/Tab";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";
import Application from "@/components/Application";
import Empty from "@/components/Empty";
import Meta from "../../app/utils/Meta";

export default function adminPanel() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState(null);

  const [newApplications, setNewApplications] = useState([]);
  const [activeApplications, setActiveApplications] = useState([]);
  const [completedApplications, setCompletedApplications] = useState([]);

  const getApplications = async () => {
    try {
      const res = await client.get("/getAppsData");

      res.data.map((application) => {
        if (application.status === 0) {
          setNewApplications((prev) => [...prev, application]);
        } else if (application.status === 1) {
          setActiveApplications((prev) => [...prev, application]);
        } else if (application.status === 3) {
          setCompletedApplications((prev) => [...prev, application]);
        }
      })
    } catch (e) {
      setError(e.message);
    }
  };

  const getUserData = async () => {
    try {
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setRole(res.data.role);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getApplications();
    getUserData();
  }, []);

  if (role !== "admin")
    return (
      <div className="flex items-center justify-center h-[100vh] w-[100%]">
        <Navbar />
        <label className="text-[24px]">
          Извините, но увидеть статистику может только член КСК
        </label>
      </div>
    );

  // if (response) {
  //   console.log(response);
  
  // }

  if (!token) return <UnAuthorized />;

  return (
    <div className="wrapper">
      <Navbar />
      <Meta title="Админ Панель" />
      <div className="flex flex-col items-center justify-center w-[80%] mt-[120px]">
        <div className="tabs">
          <div onClick={() => setStatus(0)}>
            <Tab active={status === 0 ? true : false} title="Новые заявки" />
          </div>
          <div onClick={() => setStatus(1)}>
            <Tab active={status === 1 ? true : false} title="Активные заявки" />
          </div>
          <div onClick={() => setStatus(3)}>
            <Tab
              active={status === 3 ? true : false}
              title="Завершенные заявки"
            />
          </div>
        </div>
        <div className="applications w-[100%]">
          {status === 0
            ? newApplications.map((application, index) => (
                <Application
                  key={index}
                  title={application.title}
                  status={application.status}
                  price={application.price}
                  createdAt={application.createdAt}
                  updatedAt={application.updatedAt}
                  id={application.id}
                  sender={application.sender}
                  phoneNumber={application.phoneNumber}
                />
              ))
            : null}
          {status === 1
            ? activeApplications.map((application, index) => (
                <Application
                  key={index}
                  title={application.title}
                  status={application.status}
                  price={application.price}
                  createdAt={application.createdAt}
                  updatedAt={application.updatedAt}
                  id={application.id}
                  sender={application.sender}
                  phoneNumber={application.phoneNumber}
                />
              ))
            : null}
          {status === 3
            ? completedApplications.map((application, index) => (
                <Application
                  key={index}
                  title={application.title}
                  status={application.status}
                  price={application.price}
                  createdAt={application.createdAt}
                  updatedAt={application.updatedAt}
                  id={application.id}
                  sender={application.sender}
                  phoneNumber={application.phoneNumber}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
