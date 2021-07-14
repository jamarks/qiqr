import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { signIn, signOut, useSession } from 'next-auth/client'



const navigation = [
   { name: 'Home', href: '#', current: true },
   { name: 'Pricing', href: '#', current: false },
   { name: 'About', href: '#', current: false },
   { name: 'Get your QIQR', href: '#', current: false },

]


const title = 'Bye, Business Card. Hello, QIQR.', description = '', keyworkds = '', currentURL = '', previewImage = '', siteName = ''


export default function Layout({ children }) {

   const [session, loading] = useSession()

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
         </header>
         <main>
            {children}
         </main>
         <footer>
         </footer>
      </div>

   )
}