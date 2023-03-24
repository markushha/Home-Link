import Navbar from "@/components/Navbar";
import Meta from "../../app/utils/Meta";
import UnAuthorized from "@/components/UnAuthorized";

function Contacts({ token }) {
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
