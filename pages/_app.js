import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
        <NextNprogress color="#1E3A8A" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
      </Provider>
    </>
  )
}


export default MyApp
