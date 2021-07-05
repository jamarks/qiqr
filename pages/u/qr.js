import { useRouter } from 'next/router'

export default function Qrviewer({qrimage}){
 
 const router = useRouter()
 const { name, image } = router.query
 

 return(
 <>
 <div className='container w-full mx-auto py-10 px-10'>
  <div className='w-full mx-auto mb-2 '>{name}</div>
  <div>
   
  </div>
 </div>
 
 </>
)

}