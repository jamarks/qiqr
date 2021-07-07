import Layout from '../../components/layout'
import Image from 'next/image'
import Link from 'next/link'
import db from '../../utils/db';
var QRCode = require('qrcode')
var vCardsJS = require('vcards-js');

//https://www.npmjs.com/package/vcards-js
var makeTextFile = function( text ) {
  var data = new Blob([text], {type: 'text/plain'});

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  console.log(text)
  var textFile = window.URL.createObjectURL(data);
  console.log(textFile)

  return textFile;
};


export default function Profile({ user,qrimage,vCardString }) {
  //console.log(qrimage)
  //console.log(vCardString)
  return (
    <Layout title={user.name + ' | ' + user.companyname} description={user.aboutme} keyworkds={user.name}>
      <div className="flex flex-col-reverse lg:flex-row w-5-12 md:w-8/12 md:mx-auto bg-white dark:bg-gray-800 shadow rounded">
        <div className="w-full lg:w-1/2">
          <div aria-label="card" className="px-5 md:py-3 py-8">
            <div className="flex justify-between items-center flex-col mb-3 ">
              <div className='w-full '><h4 className="text-base text-blue-900 dark:text-indigo-600 tracking-normal leading-4">{user.companyname}</h4></div>
              <div className='w-full '><h1 className="mt-4 mb-0 tracking-normal text-xl lg:text-2xl font-bold">{user.name}<small className='pd-2 text-xs text-gray-500 font-light'> {user.titlesmall}</small></h1></div>
              <div className='w-full '><h2 className="lg:mt-0 text-gray-600 dark:text-gray-400 text-base font-normal">{user.title}</h2></div>
            </div>

            <p className="mb-6 font-normal text-gray-600 dark:text-gray-400 text-sm tracking-normal w-11/12 lg:w-9/12">{user.aboutme}</p>
            <div className="flex lg:items-center items-start flex-col lg:flex-row">
              <button className="text-gray-600 dark:text-gray-400 focus:outline-none hover:text-indigo-700 focus:text-indigo-700 mt-4 lg:mt-0 ml-0 lg:ml-0 flex items-end">
                <span className="mr-1 ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx={12} cy={11} r={3} />
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                  </svg>
                </span>
                <p className=" text-sm tracking-normal font-normal text-center">{user.location}</p>
              </button>
            </div>
          </div>
          <div className="px-5 py-3 flex flex-row items-center border-t border-gray-300">
            <div className="flex items-center flex-wrap">

              <div className="py-2 px-1">
                <a href={'mailto:' + user.email} className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-900 rounded hover:bg-indigo-600 focus:outline-none text-white">Email</a>
              </div>
              <div className="py-2 px-1">
                <a href={'tel:' + user.phone} className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-900 rounded hover:bg-indigo-600 focus:outline-none text-white">Phone</a>
              </div>
              <div className="py-2 px-1">
                <a href={user.linkedin} className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-900 rounded hover:bg-indigo-600 focus:outline-none text-white">Linkedin</a>
              </div>
              <div className="py-2 px-1">
                <a href={'http://maps.google.com/?q=' + encodeURIComponent(user.address)} className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-900 rounded hover:bg-indigo-600 focus:outline-none text-white">Address</a>
              </div>
              <div className="py-2 px-1">
                              <Link href={`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/api/vcard/${user.id}`}>
                <a download className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-900 rounded hover:bg-indigo-600 focus:outline-none text-white">vCard</a>
              </Link>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 flex flex-row border-t border-gray-300">
          <button aria-label="save" className="text-blue-900 focus:outline-none focus:text-gray-400 hover:text-gray-400  text-gray-600 dark:text-gray-400  cursor-pointer mr-4">
                  <svg className="feather feather-bookmark" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
                <button aria-label="share" className="text-blue-900 dark:text-indigo-600  hover:text-indigo-500  focus:outline-none focus:text-indigo-500 cursor-pointer">
                  <svg className="feather feather-share-2" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx={18} cy={5} r={3} />
                    <circle cx={6} cy={12} r={3} />
                    <circle cx={18} cy={19} r={3} />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
                <div className='px-5 py-4 mt-2 cursor-pointer'>
                  <Link href={`${process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL}/u/qr?name=${encodeURIComponent(user.name)}&image=${encodeURIComponent(qrimage)}`}>
                    <a>
                      <Image src="/images/QR_icon.svg" alt={user.name} height={26} width={26} />
                    </a>
                  </Link>
                </div> 
                
                
          </div>
        </div>
        <div className="relative w-full h-96 md:h-100 lg:w-1/2 rounded-t lg:rounded-t-none lg:rounded-r inline-block">
          <Image className="w-full h-full absolute inset-0 object-cover rounded-t lg:rounded-r lg:rounded-t-none" layout="fill" src={user.photo} alt="banner" />
        </div>
      </div>
      
    </Layout>
  )


}

export async function getStaticPaths() {

  const entries = await db.collection('user').get();
  const entriesData = entries.docs.map(user => ({
    id: user.id,
    ...user.data()
  }));

  
  const paths = entriesData.map((item) => ({
    params: { id: item.permalink }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const entries = await db.collection('user').get();
  
  const entriesData = entries.docs.map(user => ({
    id: user.id,
    ...user.data()
  }));

  
  //****QR *******//
  const user = entriesData.find(item => item.permalink == params.id)
  let qrimage = await QRCode.toDataURL(process.env.NEXT_PUBLIC_PROTOCOL + process.env.NEXT_PUBLIC_VERCEL_URL + '/u/' + user.permalink,{ errorCorrectionLevel: 'H' })
  //****QR *******//


  //**** VCARD *******//
  var vCard = vCardsJS();

  let names =  user.name.split(" ");
     //set properties
  vCard.formattedName = user.name
  vCard.firstName = names[0];
  //vCard.middleName = 'J';
  vCard.lastName = names[names.length-1];
  vCard.organization = user.companyname
  vCard.photo.attachFromUrl(user.photo, 'JPEG');
  vCard.workPhone = user.phone
  //vCard.birthday = new Date(1985, 0, 1);
  vCard.title = user.title;
  vCard.url = user.linkedin
  vCard.note = user.aboutme;

  let vCardString = vCard.getFormattedString()

  //**** VCARD *******//


  return {
    props: {
      user: user,qrimage:qrimage,vCardString:vCardString
    }
  }
}
