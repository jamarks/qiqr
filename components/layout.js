import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function Layout({children,
 title = 'EntrenaYa - Gimnasios',
 description = 'Gimnasios en Capital Federal',
 keyworkds = 'gimnasios, pilates, crossfit'}){
 const router = useRouter()
return (

 <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"></meta>
        <meta name='description' content={description}></meta>
        <meta name='keyworkds' content={keyworkds}></meta>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />

        {/* Twitter 
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content={twitterHandle} key="twhandle" />

        {/* Open Graph 
        <meta property="og:url" content={currentURL} key="ogurl" />
        <meta property="og:image" content={previewImage} key="ogimage" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        
        */}

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      </Head>
      <main className='py-2 md:py-10 px-2 sm:px-6'>
        {children}
      </main>
      <footer className='text-xs text-gray-400 text-right px-2 sm:px-6'>
        <Link href='/'>
          <a>qrme</a>
        </Link>
      </footer>
    </div>
)
}