import { data } from 'autoprefixer'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';

export default function Secret() {



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
      const response = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/api/users`)
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

      <main className='container w-10/12 mx-auto'>

        <h1 className='my-4 text-md'>QIQR guests</h1>
        <h2 className='size-md'>{data.length} records</h2>
        <div className='flex flex-wrap '>
          {data && data.map((item) => (
            <div key={item.id} className='w-full md:w-6/12 px-2 py-2'>
              <Link href={`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_VERCEL_URL}/u/${item.id}`}>
                <a className=''>
                  
                    <div className="relative float-left h-48 md:w-1/3 rounded-t lg:rounded-t-none lg:rounded-r  ">
                      {item.profilePhoto &&
                        <Image unoptimized={true} className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none" layout="fill" src={item.profilePhoto} alt={item.profileName} />
                      }
                      {!item.profilePhoto &&
                        <div className='w-full h-full bg-gray-400 opacity-75 mx-auto text-center pt-40'>[No photo yet]</div>
                      }
                    </div>
                    <div className="float-right md:w-2/3 text-sm pl-5">
                    <b>{item.profileName}</b><br/>
                    {item.profileCompanyName}<br/>
                    {item.profileTitle}
                    
                    </div>
                  
                </a>
              </Link>
            </div>

          ))}

        </div>
      </main>

    </div>
  )
}
