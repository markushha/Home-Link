import Head from 'next/head';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log(token)
  }, []);

  return (
    <>
      <Head>
        <title>HomeLink</title>
      </Head>
      <main className='main'>
          <Navbar/>
        <div className='wrapper'>
          <div className='flex flex-col w-full wrap-content'>
            
          </div>
        </div>
      </main>
    </>
  )
}
