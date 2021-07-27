import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import mobilePreview from '../public/images/preview.png'
import mobilePreviewTorcido from '../public/images/preview-torcido.png'

export default function Home() {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session)
      router.push('/admin')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])


  return (
    <Layout>
      <main className=' container mx-auto w-full md:w-8/12 py-6 '>

        <div className='flex flex-col md:flex-row'>
          <div className='md:w-2/12'></div>
          <div className="mx-auto pl-4 w-8/12 md:w-4/12 md:ml-0 py-15 md:py-48">
            <h1 className='mb-6 text-2xl'>Bye, Business Card. <br />Hello, QIQR.</h1>

            <a href={`/api/auth/signin`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
              Get your own
            </a>

            <br /><br />
            <small> Its QIQR because it is „Quicker“</small>

          </div>
          <div className='mx-auto w-12/12 md:ml-0 md:w-6/12 py-2 md:py-12 md:py-24'>
          <img src='/images/preview-torcido.png' alt='QIQR preview' className='w-60'></img>
          </div>
        </div>

      </main>
    </Layout>
  )
}