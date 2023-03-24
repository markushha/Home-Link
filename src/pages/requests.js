import Navbar from "@/components/Navbar"
import UnAuthorized from "@/components/UnAuthorized"
import Meta from "../../app/utils/Meta"

function Requests({ token }) {
  if (!token) return <UnAuthorized />

  return (
    <>
    <Meta title="Заявки" />
    <div className="wrapper">
      <Navbar />
      <div className="container">

      </div>
    </div>
    </>
  )
}

export default Requests
