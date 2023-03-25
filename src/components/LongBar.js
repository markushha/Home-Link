import React from 'react'
import Image from 'next/image'

export default function LongBar({ title }) {
  return (
    <div className="main-block">
              <label className="main-title">
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
