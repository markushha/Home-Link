import Link from "next/link"
import Navbar from "./Navbar"

function UnAuthorized() {
  return (
    <div className="wrapper">
      <Navbar />
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col justify-center items-center text-center">
        <label className="text-2xl font-bold">У вас нет доступа к этой странице<br/>Авторизуйтесь или зарегистрируйтесь!</label>
        <div className="flex justify-center items-center">
        <Link href="/auth/register"><button className="w-[250px] h-[55px] bg-[#7265FF] rounded-[16px] hover:bg-[#5A63FF] transition-all text-[22px] text-white mt-8 mr-8">Регистрация</button></Link>
          <Link href="/auth/login"><button className="w-[250px] h-[55px] bg-[#7265FF] rounded-[16px] hover:bg-[#5A63FF] transition-all text-[22px] text-white mt-8">Войти</button></Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UnAuthorized
