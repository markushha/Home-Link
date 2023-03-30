import Image from "next/image"
import Meta from "../../app/utils/Meta"
import Navbar from "./Navbar"
import Link from "next/link"

function Developing() {
  return (
    <div className="wrapper">
      <Meta title="В разработке"/>
      <Navbar />
      <div className="flex h-[100vh] items-center flex-col justify-center w-[100%]">
        <div className="mb-[20px]">
          <Image src="/icons/develping.svg" alt="develop-icon" width={68} height={68} />
        </div>
        <p className="text-[24px] font-medium">Данный раздел в разработке</p>
        <p className="text-[20px] font-regular mt-[5px] mb-[10px]">Но скоро все будет!</p>
        <Link href="/"><button className="submit-button">На главную</button></Link>
      </div>
    </div>
  )
}

export default Developing
