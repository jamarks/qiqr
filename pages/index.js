import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

import Layout from '../components/layout'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import mobilePreview from '../public/images/preview.png'
import mobilePreviewTorcido from '../public/images/preview-torcido.png'
import qiqrLogo from '../public/images/QIQR_Logo.png'

import Section from '../components/index/section'
import Pricing from '../components/index/pricing'
import Divisor from '../components/index/divisor'

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
            <a href={`/api/auth/signin`} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => {
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

            <a href={`/api/auth/signin`} className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 mb-4 px-4 rounded' onClick={(e) => {
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
      <Divisor />
      <Section title='Who needs another app?' subtitle='No one really. But this one makes sense' color='bg-gray-100'>
        <div className='flex'>
        <div className='w-full md:w-2/12'></div>
          <div className="mx-auto pl-0 w-10/12 md:w-6/12 md:ml-0 py-10 ">
            <p>Keep your contacts up-to-date efortless</p>
            <p>Share your contact data in 5 seconds </p>
            <p>Changed your phone? Your position? Let everyone know instantly</p>
            <p>Print your QIQR! Whatever happens, your QR code will always be the same.</p>
            <p>Integreate with Behance, Github, Linkedin. </p>
            <p>It is private. Google can not see it. </p>
            <h3 className='mt-3 mb-1'> Need more?</h3>
            <p>Create different QIQR with different information. Share only what you want</p>
            <p>Track who saw your profile</p>
            <p></p>

            <h3 className='mt-3 mb-1'> Corporate</h3>
            <p> Own and manage your employees contacts. </p>
            <p> Setup needed contacts per sectory of your company. Sindicate to all employess in one click. </p>
          </div>
          
          <div className='mx-auto w-12/12 mt-8 md:ml-0 md:w-5/12 py-2 md:py-12 md:py-10 pl-12 '>
            <img src='/images/preview-qiqr-w-logo.png' alt='QIQR Profile Preview' className='w-44'></img>
          </div>


        </div>

      </Section>
      <Divisor />
      <Section title='Pricing' subtitle='Plans starting at $0'>
        <div className='flex'>
          <Pricing title='Free' subtitle='Always free QIQR version' price='$0 - Always free'>
            <ul>
              <li>Free QIQR profile</li>
              <li>Shearable QR code. Print it!</li>
              <li>Lorem ipsum dolor sit amet, </li>
            </ul>
          </Pricing>
          <Pricing title='Personal & Business' subtitle='The real innovation' price='$1 monthly - Billed yearly'>
            <ul>
              <li>All free +</li>
              <li>See who captured your QIQR</li>
              <li>Be notice who change any of their profile contact info</li>
              <li>consectetur adipiscing elit</li>
              <li>Maecenas fermentum ante et sapien</li>
              <li>Dignissim in viverra magna feugiat</li>
              <li>Donec tempus ipsum nec neque dignissim </li>
            </ul>
          </Pricing>
          <Pricing title='Corporate' subtitle='The real innovation' price='From $2.99 monthly'>
            <ul>
              <li>Free QIQR profile</li>
              <li>Shearable QR code. Print it!</li>
              <li>consectetur adipiscing elit</li>
              <li>Maecenas fermentum ante et sapien</li>
              <li>Dignissim in viverra magna feugiat</li>
              <li>Donec tempus ipsum nec neque dignissim </li>
            </ul>
          </Pricing>
        </div>
      </Section>
    </Layout>
  )
}