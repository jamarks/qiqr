import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

export default function Home() {



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
      const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/users`)
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

      <main className=''>
        get your own qr
        <br />
        <p>Some of other guests</p>
        {data && data.map((item) => (
          <Link key={item.id} href={process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + item.permalink}>
            <a>
              {item.name}
            </a>
          </Link>
        ))}
      </main>

      <footer className=''>
        by jamarks @ googlemail
      </footer>
    </div>
  )
}
