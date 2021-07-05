import { useRouter } from 'next/router'

export default function Qrviewer({qrimage}){
 
 const router = useRouter()
 const { name, image } = router.query
 

 return(
 <>
 <div className='container w-full mx-auto py-10 px-10'>
  <div className='w-full mx-auto mb-2 text-2xl'>{name}</div>
  <div>
   <img alt='qr' src={image} width='100%' height='100%'></img>
  </div>
 </div>
 
 </>
)

}