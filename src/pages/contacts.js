import Navbar from "@/components/Navbar";
import Meta from "../../app/utils/Meta";
import UnAuthorized from "@/components/UnAuthorized";
import { useState, useEffect } from 'react';

function Contacts() {
  const [token, setToken] = useState(null);

  useEffect(() => {
      setToken(localStorage.getItem("token"));
  }, [])

  if (!token) return <UnAuthorized />

  return (
    <>
    <Meta title="Контакты" />
    <div className="wrapper">
      <Navbar/>
      <div className="container">
        
      </div>
    </div>
    </>
  )
}

export default Contacts
