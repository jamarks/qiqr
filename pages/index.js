import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import mobilePreview from '../public/images/preview.png'
import mobilePreviewTorcido from '../public/images/preview-torcido.png'
import qiqrLogo from '../public/images/QIQR_Logo.png'

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
      <nav className='container mx-auto w-10/12 md:w-10/12'>
        <div className='flex justify-between'>
          <Image className='pull-left' src={qiqrLogo} width={50} height={50} alt='QIQR Logo'></Image>
          <div className='pt-2'>
            <a href={`/api/auth/signin`} className='py-2 px-4' onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
              Sign in
            </a>
            <a href={`/api/auth/signin`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
              Sign up
            </a>
          </div>
        </div>
      </nav>
      <section className='container mx-auto w-full md:w-8/12 py-6 '>
        <div className='flex flex-col md:flex-row'>
          <div className='md:w-1/12'></div>
          <div className="mx-auto pl-0 w-10/12 md:w-6/12 md:ml-0 py-15 md:py-32">
            <h1 className='mb-8 text-4xl pt-16 md:pt-0 md:text-6xl'>Bye, Business Card. <br />Hello, QIQR.</h1>

            <a href={`/api/auth/signin`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-4 px-4 rounded' onClick={(e) => {
              e.preventDefault()
              signIn()
            }}>
              Get your own
            </a>

            <br /><br />
            <p className='text-xl mt-6'> It&apos;s QIQR because it is „Quicker“</p>

          </div>
          <div className='mx-auto w-12/12 mt-8 md:ml-0 md:w-5/12 py-2 md:py-12 md:py-24'>
            <img src='/images/preview-qiqr-w-logo.png' alt='QIQR Profile Preview' className='w-60'></img>
          </div>
        </div>
      </section>
      
      
      {/* <section className='relative w-full '>
        <div className="absolute inset-0 pointer-events-none mb-16" aria-hidden="true"></div>
        <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div><div className='absolute flex flex-col justify-center w-full mx-auto px-4 sm:px-6'>
          <div className="pt-12 md:pt-20 bg-gray-100">
            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
              <h2 className="text-3xl mb-4">Who needs another app?</h2>
              <p className="text-xl text-gray-600">No one really. But this one makes sense</p>

              
              <p>Keep your contacts up-to-date efortless</p>
              <p>Share your contact data in 5 seconds </p>
              <p>Changed your phone? Your position? Let everyone know instantly</p>
              <p>Print your QIQR! Whatever happens, your QR code will always be the same.</p>
              <p>Integreate with Behance, Github, Linkedin. </p>
              <p></p>
              <p>Plans starting at $0.</p>
              <p>It is private. Google can not see it. </p>
              <p></p>

              <h3> Need more?</h3>
              <p>Create different QIQR with different information. Share only what you want</p>
              <p>Track who saw your profile</p>
              <p></p>

              <h3> Corporate</h3>
              <p> Own and manage your employees contacts. </p>
              <p> Setup needed contacts per sectory of your company. Sindicate to all employess in one click. </p>
              
              
            </div>
          </div>
        </div>
     </section> */}
    </Layout>
  )
}