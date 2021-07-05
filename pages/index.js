import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

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
      </main>

      <footer className=''>
          by jamarks @ googlemail
      </footer>
    </div>
  )
}
