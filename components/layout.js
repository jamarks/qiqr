import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { signIn, signOut, useSession } from 'next-auth/client'
import qiqrLogo from '../public/images/QIQR_Logo.png'


const navigation = [
   { name: 'Home', href: '#', current: true },
   { name: 'Pricing', href: '#', current: false },
   { name: 'About', href: '#', current: false },
   { name: 'Get your QIQR', href: '#', current: false },

]


const title = 'Bye, Business Card. Hello, QIQR. QR Generator', description = 'Digital Business Card + QR Generator and vCard Generator', keyworkds = 'digital business card, vcard generator, qr generator', currentURL = 'https://qiqr.app', previewImage = '', siteName = 'QIQR app'


export default function Layout({ children }) {

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

      <div>
         <Head>
            <title>{title}</title>
            <meta charSet="utf-8"></meta>
            <meta name='description' content={description}></meta>
            <meta name='keyworkds' content={keyworkds}></meta>
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
            <meta property="og:url" content={currentURL} key="ogurl" />
            <meta property="og:image" content={previewImage} key="ogimage" />
            <meta property="og:site_name" content={siteName} key="ogsitename" />


            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
         </Head>
         <header>
            <div className='flex justify-end container w-full md:w-10/12 mx-auto pt-6 pb-4 text-lg lg:text-sm'>
               {session &&
                  <>
                     <div className='flex-initial hidden lg:block mr-10'>
                        <h1>Its <b>QIQR</b> because it is „Quicker“</h1>
                     </div>


                     <div className=''>
                        <Link href='/admin'>
                           <a className='text-blue-700 hover:text-blue-500 underline'>
                              <span className='hidden lg:block'>Edit profile</span>
                              <span className='lg:hidden'>Edit </span>
                           </a>
                        </Link>
                     </div>
                     <div className='ml-5 hidden lg:block'>
                        <Link href={process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id}>
                           <a className='text-blue-700 hover:text-blue-500 underline' >My QIQR</a>
                        </Link>
                     </div>
                     <div className='ml-5 mr-5 md:mr-2 lg:mr-0'>
                        <a className='text-blue-700 hover:text-blue-500 underline'
                           href={`/api/auth/signout`}
                           onClick={(e) => {
                              e.preventDefault()
                              signOut()
                           }}
                        >
                           Sign out
                        </a>
                     </div>
                  </>
               }
            </div>
         </header>
         <main>
            {children}
         </main>
         <footer>
         <div className='container mx-auto w-10/12 md:w-10/12 pb-20'>
            <div className='flex justify-between'>
               <Image className='pull-right' src={qiqrLogo} width={25} height={25} alt='QIQR Logo'></Image>
               <small>QIQR made with love.</small>
            </div>
         </div>
         </footer>
      </div>

   )
}