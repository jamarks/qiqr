import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

export default function Secret() {



 const [data, setData] = useState([{ id: 'test', name: 'test' }]);

 /*useEffect(async () => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/users`)
   const data = await response.json()
 
   setData(data.entriesData);
   console.log(data.entriesData)
 }, []);

 */
 useEffect(() => {
  async function fetchData() {
   const response = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/api/users`)
   const data = await response.json()

   return (data.entriesData)
  }
  const users = fetchData()
   .then(data => setData(data))
 }, []); // Or [] if effect doesn't need props or state

 return (
  <div className='container'>
   <Head>
    <title>qrme</title>
    <meta name="description" content="qrme" />
    <link rel="icon" href="/favicon.ico" />
   </Head>

   <main className='container w-10/12 mx-auto'>

    <h1 className='my-4 text-md'>Some of other guests</h1>
    <div className='flex mb-4'>
     {data && data.map((item) => (
      <div className='' key={item.id} >
       <Link href={`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}/u/${item.id}`}>
        <a className=''>
         {item.name} - {item.companyname}
        </a>
       </Link>
      </div>
     ))}
    </div>
   </main>

   <footer className='container w-10/12 mx-auto'>
    by jamarks @ googlemail
   </footer>
  </div>
 )
}
