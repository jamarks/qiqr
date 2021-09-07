import qiqrLogo from '../../public/images/QIQR_Logo.png'
import Image from 'next/image'
import { providers, signIn, getSession, csrfToken } from "next-auth/client";

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-indigo-400 text-white font-bold rounded-lg border shadow-lg p-10">
        <Image className='' src={qiqrLogo} width={40} height={40} alt='QIQR Logo'></Image>
        {Object.values(providers).map((provider) => (
          <div key={provider.name} className='my-6'>
            <button onClick={() => signIn(provider.id)} className='bg-white text-gray-600 font-semibold py-2 px-4 rounded'>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
      <div>
      <p className='text-base mt-6'> It&apos;s QIQR because it is „Quicker“</p>
      </div>
    </div>


  );
}
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  
  if (session) {
    return {
      redirect: { destination: "/admin" },
    };
  }

  return {
    props: {
      providers: await providers(context),
      csrfToken: await csrfToken(context),
    },
  };
}