import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'


const navigation = [
   { name: 'Home', href: '#', current: true },
   { name: 'Pricing', href: '#', current: false },
   { name: 'About', href: '#', current: false },
   { name: 'Get your QIQR', href: '#', current: false },

]

function classNames(...classes) {
   return classes.filter(Boolean).join(' ')
}




const title = '', description = '', keyworkds = '', currentURL = '', previewImage = '', siteName = ''


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
         <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
               <>
                  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                     <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                           {/* Mobile menu button*/}
                           <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                              <span className="sr-only">Open main menu</span>
                              {open ? (
                                 <XIcon className="block h-6 w-6" aria-hidden="true" />
                              ) : (
                                 <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                              )}
                           </Disclosure.Button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                           <div className="flex-shrink-0 flex items-center">
                              <Link href='/'>
                                 <a>
                                    <img
                                       className="block lg:hidden h-8 w-auto"
                                       src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                       alt="Workflow"
                                    />
                                    <img
                                       className="hidden lg:block h-8 w-auto"
                                       src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                       alt="Workflow"
                                    />
                                 </a>
                              </Link>
                           </div>
                           <div className="hidden sm:block sm:ml-6">
                              <div className="flex space-x-4">
                                 {navigation.map((item) => (
                                    <a
                                       key={item.name}
                                       href={item.href}
                                       className={classNames(
                                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'px-3 py-2 rounded-md text-sm font-medium'
                                       )}
                                       aria-current={item.current ? 'page' : undefined}
                                    >
                                       {item.name}
                                    </a>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                           {!session && <>
                              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => signIn()}>Log in</button>
                           </>}

                           {session && <>
                              <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                 <span className="sr-only">View notifications</span>
                                 <BellIcon className="h-6 w-6" aria-hidden="true" />
                              </button>

                              <Menu as="div" className="ml-3 relative">
                                 {({ open }) => (
                                    <>
                                       <div>
                                          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                             <span className="sr-only">Open user menu</span>
                                             {session.user.image &&

                                                <img
                                                   className="h-8 w-8 rounded-full"
                                                   src={session.user.image}
                                                   alt=""
                                                />
                                             }
                                             {!session.user.image &&
                                                <>
                                                   <span className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
                                                      {session.user.email || session.user.name}
                                                   </span>
                                                </>
                                             }
                                          </Menu.Button>
                                       </div>
                                       <Transition
                                          show={open}
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                       >
                                          <Menu.Items
                                             static
                                             className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                          >
                                             <Menu.Item>
                                                {({ active }) => (
                                                   <Link href='/admin'>
                                                      <a
                                                         className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                         )}
                                                      >
                                                         Your Profile
                                                      </a>
                                                   </Link>
                                                )}
                                             </Menu.Item>
                                             <Menu.Item>
                                                {({ active }) => (
                                                   <Link href="/admin">
                                                      <a

                                                         className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                         )}
                                                      >
                                                         Settings
                                                      </a>

                                                   </Link>
                                                )}
                                             </Menu.Item>
                                             <Menu.Item>
                                                {({ active }) => (
                                                   <Link href={`/api/auth/signout`}>
                                                      <a
                                                         className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block px-4 py-2 text-sm text-gray-700'
                                                         )}
                                                      >
                                                         Sign out
                                                      </a>
                                                   </Link>
                                                )}
                                             </Menu.Item>
                                          </Menu.Items>
                                       </Transition>
                                    </>
                                 )}
                              </Menu>
                           </>}
                        </div>
                     </div>
                  </div>

                  <Disclosure.Panel className="sm:hidden">
                     <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                           <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                 'block px-3 py-2 rounded-md text-base font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                           >
                              {item.name}
                           </a>
                        ))}
                     </div>
                  </Disclosure.Panel>
               </>
            )}
         </Disclosure>
         <main>
            {children}
         </main>
         <footer>
         </footer>
      </div>

   )
}