import Image from "next/image";
import React from "react";

export default function Bar({ path, title, size, active }) {
  return (
    <div className={`bar-wrapper ${active ? "bar-active" : ""}`} 
    >
      <div className="justify-center items-center flex w-[60px] h-[60px]">
        <Image src={path} alt={title} width={size ? 50 : 60} height={size ? 50 : 60} />
      </div>
      <label>{title}</label>
    </div>
  );
}
