import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

export default function Home() {

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

        
      </main>

      <footer className=''>
        by jamarks @ googlemail
      </footer>
    </div>
  )
}
