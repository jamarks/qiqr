import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import AccessDenied from '../../components/general/accesDenied'
import LoadingLayer from '../../components/general/loadingLayer'

import Layout from '../../components/layout'
import UrlTextField from '../../components/admin/urlTextField'
import TextField from '../../components/admin/textField'

import { useSession } from 'next-auth/client'
import NProgress from "nprogress";

export default function Admin() {

  const [loadHandler, setLoadHandler] = useState(false)
  const [session, loading] = useSession()
  const [photo, setPhoto] = useState();

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


  const toggleLoading = (value) => {
    setLoadHandler(value)
    return

  }

  async function Share(title, url) {
    //console.log(title, url)
    try {

      if (navigator.canShare) {
        await navigator.share({ title: title, text: 'Here is ' + title + ' QIQR', url: url });
      }

    } catch (err) {
      console.error(err.message);
    }

  };

  const uploadPhoto = async (e) => {
    toggleLoading(true)
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const upload = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      setPhoto(process.env.NEXT_PUBLIC_S3_URL + '/' + filename)
      setUserData({ ...userData, profilePhoto: process.env.NEXT_PUBLIC_S3_URL + '/' + filename });
      //console.log(userData);
      toggleLoading(false)
    } else {
      console.error('Upload failed.');
      toggleLoading(false)
    }
  };

  const handleOnChange = event => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    //console.log(session)
    toggleLoading(true)
    const fetchData = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/api/data/user/getUserData')
      const json = await res.json()
      if (json) {
        //console.log(json)
        setUserData(json)
        setPhoto(json.profilePhoto)
        toggleLoading(false)
      }
    }
    if (session) {
      fetchData()
    }
  }, [session])

  const Save = async event => {
    toggleLoading(true)
    event.preventDefault();

    //console.log(userData)
    const res = await fetch('/api/data/user/updateUserData',
      {
        body: JSON.stringify({ ...userData }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    const result = await res.json()
    console.log(result)
    setTimeout(() => { toggleLoading(false) }, 1000)


  }

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return <Layout><AccessDenied /></Layout> }

  return (
    <Layout>
      {loadHandler &&
        <LoadingLayer></LoadingLayer>
      }
      <div className='container w-full px-4 md:px-0 md:w-10/12 mx-auto py-6'>
        <form onSubmit={(e) => Save(e)}>
          <div>
            <div className="mt-6 md:mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Your QIQR</h3>
                    <p className="mt-1 text-sm text-gray-600">This is your permanent QIQR profile url and will never change.</p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-3">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          {session &&
                            <Link href={process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id}>
                              <a className='text-blue-700 underline' target='_blank'>
                                {process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id}
                              </a>
                            </Link>

                          }
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <a href='#' className='float-left ' onClick={() => { navigator.clipboard.writeText(process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id) }} >
                            <img alt='copy url' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAbUlEQVRIiWNgGE7Am4GB4QkDA8N/MjFB8JgCw4mygGiFpAAmahtIigXkxsljBgYGT2wGogcRJXHyiBgLyI0TFH0DGgejFoxaMFIsYEFiM9LCggENoidQmpyK5zExlnsykFeiPmJgYPAgxoKhAQAobmMW+E0ohwAAAABJRU5ErkJggg==" />
                          </a>
                          <button onClick={(e) => Share(userData.profileName, process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + userData.id)} aria-label="share" className="md:hidden ml-5 text-blue-900 dark:text-indigo-600  hover:text-indigo-500  focus:outline-none focus:text-indigo-500 cursor-pointer">
                            <svg className="feather feather-share-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx={18} cy={5} r={3} />
                              <circle cx={6} cy={12} r={3} />
                              <circle cx={18} cy={19} r={3} />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200" />
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Login Information</h3>
                    <p className="mt-1 text-sm text-gray-600">Data we got from your sign up. This is permanent. </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-3">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">

                        {userData && <TextField onChange={handleOnChange} label='Full name' name='name' value={userData.name} placeholder='Complete name' readonly={true}></TextField>}
                        {userData && <TextField onChange={handleOnChange} label='Email' name='email' value={userData.email} placeholder='Email Address' readonly={true}></TextField>}

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Presentation</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Your full name, email and headline are in real-life how you present your self.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Name' name='profileName' value={userData.profileName} placeholder='Bill Gates'></TextField>}

                      {userData && <TextField onChange={handleOnChange} label='Email' name='profileEmail' value={userData.profileEmail} placeholder='bill@gates.com'></TextField>}
                    </div>
                    <div className="grid grid-cols-1">
                      <div>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          Headline About you in 1 sentence.
                        </label>
                        <div className="mt-1">
                          {userData &&
                            <textarea
                              id="profileAboutMe"
                              name="profileAboutMe"
                              rows={2}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                              placeholder="I love guitars and cooking"
                              value={userData.profileAboutMe}
                              onChange={(e) => handleOnChange(e)}
                            />
                          }
                        </div>
                      </div>
                    </div>
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
              
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Work</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.<br /><br />
                    <b>Visible address</b> will be shown and linked to Google Maps, but the other address inputs are for the vCard. They could be very usefull.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Company Name' name='profileCompanyName' value={userData.profileCompanyName} placeholder='MicroStrategy'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Title / Role' name='profileTitle' value={userData.profileTitle} placeholder='MicroStrategy Founder'></TextField>}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Sub Title (x-small)' name='profileSubTitle' value={userData.profileSubTitle} placeholder='CEO'></TextField>}
                    </div>
                    <div className="grid grid-cols-1">
                      <hr />
                    </div>
                    <div className="grid grid-cols-1">
                      {userData && <TextField onChange={handleOnChange} label='Visible Address (Suitable for Google Map Search )' name='profileLocation' value={userData.profileLocation} placeholder='Grolmanstr. 15, 10623, Berlin, Germany'></TextField>}
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Street' name='profileStreet' value={userData.profileStreet} placeholder='Grolmanstr. 12'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Zip Code' name='profileZip' value={userData.profileZip} placeholder='10799'></TextField>}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='City' name='profileCity' value={userData.profileCity} placeholder='Berlin'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Country' name='profileCountry' value={userData.profileCountry} placeholder='Germany'></TextField>}
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
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Phone and Links</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.<br /><br />
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Website' name='profileWebsite' value={userData.profileWebsite} placeholder='https://....'></TextField>}
                      {userData && <TextField onChange={handleOnChange} label='Linkedin' name='profileLinkedin' value={userData.profileLinkedin} placeholder='https://....'></TextField>}
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      {userData && <TextField onChange={handleOnChange} label='Phone' name='profilePhone' value={userData.profilePhone} placeholder='+491111111111'></TextField>}
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
              </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
            <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Photo</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Be sexy<br /><br />
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-3">
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          {photo && <img className="w-full  inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none" src={photo} alt="Photo" />}
                          
                          {!photo && 
                            <div className='text-sm py-2'> No photo yet</div>
                          }
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="file-upload"
                            className="ml-0 md:ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span>Upload image</span>
                            <input id="file-upload" onChange={uploadPhoto} type="file" accept="image/png, image/jpeg" className="sr-only" />
                          </label>
                          <br/>
                          <div className='text-sm py-2 md:ml-5'> Image up to 2 MB. <br/>The smaller and sexier, the better. </div>
                        </div>

                      </div>
                    </div>
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
            </div >



            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="mt-10 sm:mt-0">
              <div className="mt-6 md:mt-0 md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications (Coming soon!)</h3>
                    <p className="mt-1 text-sm text-gray-600">Decide which communications you would like to receive and how.</p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-3">
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
                                type="checkbox" checked
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="comments" className="font-medium text-gray-700">
                                Contacts data changed
                              </label>
                              <p className="text-gray-500">Get notified when someones changes any of their info (COMING SOON!!!!)</p>
                            </div>
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
                </div>
              </div>
            </div>
          </div>
        </form >
      </div >
    </Layout >
  )

}
