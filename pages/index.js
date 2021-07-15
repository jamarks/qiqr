import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'


export default function Home() {
  const [session, loading] = useSession()
  const [userData, setUserData] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data/user/getUserData')
      const json = await res.json()
      if (json) {
        //console.log(json)
        setUserData(json)
      }
    }
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <Layout>
      <main className='container mx-auto w-full md:w-8/12 py-6 '>

        {session && <>
          
          <div className='w-full mx-auto '>
          <div className="ml-6 md:ml-0 py-32 md:py-56">

              <h1 className='mb-6 text-lx'>Hello <b>{session.user.name}</b></h1>

              <Link href='/admin'>
                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Settings
                </a>
              </Link>

              <Link href={process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id}>
                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 md:ml-4'>
                  My QIQR
                </a>
              </Link>

              
                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 md:ml-4'
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
                >
                  Sign out
                </a>

                <br/><br/>
                <small> Its QIQR because it is „Quicker“</small>
              

            </div>
          </div>
        </>}

        {!session && <>
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
        </>}
      </main>
    </Layout>
  )
}