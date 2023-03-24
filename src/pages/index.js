import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>HomeLink</title>
      </Head>
      <main className='main'>
        <Navbar/>
        <div className='flex flex-col justify-center items-center'>
        </div>
      </main>
    </>
  )
}
