import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'


export default function Home() {
  const [session, loading] = useSession()

  return (
    <Layout>
      <main className='container mx-auto w-full md:w-8/12 py-6 '>
        
        {session && <>
          {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} className='' />}
          <div className='flex flex-col w-full'>
            <div className='py-2 pr-2 w-4/12'>
              <small>Signed in as</small><br />
              <strong>{session.user.email || session.user.name}</strong>
            </div>

            <div className='py-2 w-3/12'>
              <a
                href={`/api/auth/signout`}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </div>
          </div>

        </>}
      </main>
    </Layout>
  )
}