import Navbar from "@/components/Navbar";
import Meta from "../../app/utils/Meta";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from "react";
import client from "../../app/clients/client";
import Image from "next/image";
import Contact from "@/components/Contact";

function Contacts() {
  const [token, setToken] = useState(null);
  const [eror, setError] = useState(null);

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const searchHandler = () => {
    console.log(search);
    setSearch("");
  };

  const getContacts = async () => {
    try {
      const res = await client.get("/getContacts");
      setContacts(res.data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    getContacts();
  }, []);

  if (!token) return <UnAuthorized />;

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
          <div className="main flex items-center flex-wrap justify-between mb-[100px]">
            {contacts.map((contact, index) => (
                <Contact key={index} name={contact.name} category={contact.category} phone={contact.phoneNumber} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
