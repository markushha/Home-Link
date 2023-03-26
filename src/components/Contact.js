import Image from "next/image"

export default function Contact({ name, phone, category }) {
  return (
    <div className="w-[300px] h-[233px] rounded-[10px] text-[20px] flex flex-col mt-[30px] bg-[#F5F5F5]">
      <div className="ml-[20px] mt-[20px] text-[28px] info-section">
        <p className="">{name}</p>
        <p className="text-[#7265FF] cursor-pointer hover:underline">{phone}</p>
      </div>
      <div className="right-section flex ml-[20px] mt-[40px] flex-col items-cente justify-center self-start">
        <Image src="/icons/favourite.svg" width={40} height={40} alt="favourite" />
        <p className="text-[#7265FF] hover:underline cursor-pointer">{category}</p>
      </div>
    </div>
  )
}
