import React from 'react'
import Image from 'next/image'

export default function LongSlimBar({ title }) {
  return (
    <div className="main-slim-block">
              <label className="text-[20px] text-black ml-[16px]">
                {title}
              </label>
              <div className="icon-prof">
                <Image
                  src="/icons/arrow-right.svg"
                  alt="arrow"
                  width="40"
                  height="40"
                />
              </div>
            </div>
  )
}
