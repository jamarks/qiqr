import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

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
      <main className='container mx-auto w-full md:w-8/12 py-6 '>
        
          <div className='w-full mx-auto '>
            <div className="ml-6 md:ml-0 py-32 md:py-56">

              <h1 className='mb-6 text-2xl'>Bye, Business Card. <br />Hello, QIQR.</h1>


              <a href={`/api/auth/signin`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
                e.preventDefault()
                signIn()
              }}>
                Get your own
              </a>
              <br/><br/>
              <small> Its QIQR because it is „Quicker“</small>

            </div>
          </div>
        
      </main>
    </Layout>
  )
}