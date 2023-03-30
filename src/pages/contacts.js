import Navbar from "@/components/Navbar";
import Meta from "../../app/utils/Meta";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";
import Image from "next/image";
import Contact from "@/components/Contact";
import Loading from "@/components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contacts() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    console.log(search);
    setSearch("");
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

  const deleteContact = async (phone) => {
    try {
      setLoading(true);
      const res = await client.delete("/deleteContact", {
        phoneNumber: phone,
      });
      setLoading(false);
      setError("");
      // window.location.reload();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      setLoading(true);
      const res = await client.post("/getUserData", {
        token: localStorage.getItem("token"),
      });
      setRole(res.data.role);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const getContacts = async () => {
    try {
      setLoading(true);
      const res = await client.get("/getContacts");
      setContacts(res.data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getUserData();
    getContacts();
  }, []);

  if (!token) return <UnAuthorized />;
  if (loading) return <Loading />;

  return (
    <>
      <Meta title="Контакты" />
      <div className="wrapper">
        <Navbar />
        <div className="flex flex-col items-center justify-center w-[80%] mt-[120px]">
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
            </div>
          </div>
          <div className="main flex items-center flex-wrap mb-[100px]">
            {contacts.map((contact, index) => (
                <Contact deleteContact={deleteContact} phoneNumber={contact.phoneNumber} role={role} key={index} name={contact.name} category={contact.category} phone={contact.phoneNumber} />
              ))}
          </div>
        </div>
        {error && showToast()}
        <ToastContainer />
      </div>
    </>
  );
}

export default Contacts;
