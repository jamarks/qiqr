import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AccessDenied from '../../components/access-denied'

import Layout from '../../components/layout'
import UrlTextField from '../../components/admin/urlTextField'
import TextField from '../../components/admin/textField'

import { useSession } from 'next-auth/client'

export default function Admin() {

  const [session, loading] = useSession()
  //const [userData, setUserData] = useState()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileCity: '',
    profileCountry: '',
    profileZip: '',
    profileStreet: '',
    profileEmail: '',
    profileAddressMap: '',
    profileLinkedin: '',
    profileLocation: '',
    profileName: '',
    profilePermalink: '',
    profileTitle: '',
    profilePhoto: '',
    profilePhone: '',
    profileSubTitle: '',
    profileAboutMe: '',
  });

  const handleOnChange = event => {
    const { name, value } = event.target;
    console.log(name, value)

    setUserData({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data/user/loggedUser')
      const json = await res.json()
      if (json) {
        console.log(json)
        setUserData(json.data)
      }
    }
    if (session) {
      fetchData()
    }
  }, [session])

  useEffect(() => {
    //
  }, [userData])




  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return (<>Loading</>)

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied /></Layout> }

  return (
    <Layout>
      <div className='container w-10/12 mx-auto py-6'>
        <div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                  <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        {userData && <TextField onChange={handleOnChange} label='Full name' name='name' value={userData.name} placeholder='Complete name'></TextField>}
                        {userData && <TextField onChange={handleOnChange} label='Email' name='email' value={userData.email} placeholder='Email Address' readonly={true}></TextField>}

                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-3">
              <form action="#" method="POST">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Name' name='profileName' value={userData.profileName} placeholder='Bill Gates'></TextField>}

                      {userData && <TextField onChange={handleOnChange} label='Email' name='profileEmail' value={userData.profileEmail} placeholder='bill@gates.com'></TextField>}
                    </div>
                    <div className="grid grid-cols-1">
                      <div>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About you
                        </label>
                        <div className="mt-1">
                          {userData &&
                            <textarea
                              id="profileAboutMe"
                              name="profileAboutMe"
                              rows={2}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="I love guitars and cooking"
                              defaultValue={userData.profileAboutMe}
                            />
                          }
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. Top 20 Chacarters
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <hr />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Company Name' name='profileCompanyName' value={userData.profileCompanyName} placeholder='MicroStrategy'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Title / Role' name='profileTitle' value={userData.profileTitle} placeholder='MicroStrategy Founder'></TextField>}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Sub Title (x-small)' name='profileSubTitle' value={userData.profileSubTitle} placeholder='CEO'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Phone' name='profilePhone' value={userData.profilePhone} placeholder='+491111111111'></TextField>}
                    </div>
                    <div className="grid grid-cols-1">
                      <hr />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Street' name='profileStreet' value={userData.profileStreet} placeholder='Grolmanstr. 12'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Zip Code' name='profileZip' value={userData.profileZip} placeholder='10799'></TextField>}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='City' name='profileCity' value={userData.profileCity} placeholder='Berlin'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Country' name='profileCountry' value={userData.profileCountry} placeholder='Germany'></TextField>}
                    </div>
                    <div className="grid grid-cols-1">
                      <hr />
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Website' name='profileWebsite' value={userData.profileWebsite} placeholder='https://....'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Linkedin' name='profileLinkedin' value={userData.profileLinkedin} placeholder='https://....'></TextField>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          {userData && <img className="w-full  inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none" src={userData.profilePhoto} alt="Photo" />}
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          {userData &&
                            <textarea
                              id="profilePhoto"
                              name="profilePhoto"
                              rows={5}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="https://......file.jpg"
                              defaultValue={userData.profilePhoto}
                            />
                          }
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1">
                      <hr />
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>




        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-4 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-600">Decide which communications you would like to receive and how.</p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-3">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">By Email</legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">
                              Comments
                            </label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="candidates" className="font-medium text-gray-700">
                              Candidates
                            </label>
                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="offers" className="font-medium text-gray-700">
                              Offers
                            </label>
                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <div>
                        <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                        <p className="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                            Everything
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                            Same as email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="push-nothing"
                            name="push-notifications"
                            type="radio"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          />
                          <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )

}
