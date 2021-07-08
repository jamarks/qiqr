import { useRouter } from 'next/router'

export default function Qrviewer({qrimage}){
 
 const router = useRouter()
 const { name, image } = router.query
 

 return(
 <>
 <div className='container w-full md:w-4/12 mx-auto py-10 px-5 md:py-10 md:px-10'>
  <div>
   <img alt='qr' src={image} className='w-full h-full'></img>
  </div>
 </div>
 
 </>
)

}