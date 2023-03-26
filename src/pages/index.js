import Head from "next/head";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token);
  }, []);

  return (
    <>
      <Head>
        <title>HomeLink</title>
      </Head>
      <main className="wrapper">
        <Navbar />
          <div className="container mt-[40px]">
            <div className="flex flex-col w-full wrap-content">
              <div className="flex flex-col font-medium self-start text-[38px] w-[100%]">
                <p>
                  {" "}
                  <span className="text-[48px] font-bold text-[#7265FF]">
                    HomeLink
                  </span>{" "}
                  - платформа, которая
                  <br />
                  оказывает услуги по комплексному<br/> обслуживанию жилых домов
                </p>
              </div>
              <div className="flex items-center justify-between w-[100%] mt-[45px]">
                <div className="cursor-pointer hover:bg-[#5A63FF] transition-all mr-[50px] w-[450px] h-[350px] flex items-center justify-center flex-col rounded-[10px] text-[#F5F5F5] bg-[#7265FF]">
                  <div>
                    <p className="font-bold text-[36px]">1.</p>
                  </div>
                  <div>
                    <p className="font-medium text-center p-4 text-[20px]">
                      Мы предлагаем профессиональные услуги по управлению и
                      обслуживанию КСК, которые помогут Вам повысить качество жизни
                      жителей.
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-[#e4e4e4] transition-all mr-[50px] w-[450px] h-[350px] flex items-center justify-center flex-col rounded-[10px] text-[#7265FF] bg-[#F5F5F5]">
                  <div>
                    <p className="font-bold text-[36px]">2.</p>
                  </div>
                  <div>
                    <p className="font-medium text-center p-4 text-[20px]">
                      Мы готовы предложить нашим клиентам индивидуальный подход
                      и учитывать все особенности их жилого комплекса.
                    </p>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-[#5A63FF] transition-all w-[450px] h-[350px] flex items-center justify-center flex-col rounded-[10px] text-[#F5F5F5] bg-[#7265FF]">
                  <div>
                    <p className="font-bold text-[36px]">3.</p>
                  </div>
                  <div>
                    <p className="font-medium text-center p-4 text-[20px]">
                      Мы гарантируем высокое качество услуг, оперативность и
                      четкое соблюдение договорных обязательств.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
