import React from 'react'

// reports css

function Tab({ title, active }) {
  return (
    <>
      <div className={`tab ${active ? "active" : ""}`}>
        <div className='tab-title'>
          <label className='cursor-pointer'>{title}</label>
        </div>
      </div>
    </>
  )
}

export default Tab
