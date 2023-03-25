/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from '@/components/Navbar';
import UnAuthorized from '@/components/UnAuthorized';
import { useState, useEffect } from 'react';

export default function reports() {
  const [token, setToken] = useState(null);

  useEffect(() => {
      setToken(localStorage.getItem("token"));
  }, [])

  setTimeout(() => {
    console.log(token);
  }, 5000)

  if (!token) return <UnAuthorized />

  return (
    <div className='wrapper'>
      <Navbar />
      <div className='container'></div>
    </div>
  )
}
