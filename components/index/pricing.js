export default function Pricing({title, subtitle, price,children}){
    return <div className='w-full md:w-4/12 px-6' >
        
        <div className='bg-gray-100 mb-2 px-2 py-1 '>
            <h3 className='mt-3 mb-1 text-xl'>{title}</h3>
            <span className='italic'>{subtitle}</span>
        </div>
        <div className='h-64 mb-4'>
            {children}
        </div>
        
        <div>
            <span className='bg-gray-200 px-2 py-2'>{price}</span>
        </div>
        <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-4 py-2 mb-2 px-4 rounded'>Sign up</button>
        
    </div>
}