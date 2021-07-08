import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import NextNprogress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <NextNprogress color="#1E3A8A" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true}/>
    </>
  )
}


export default MyApp
