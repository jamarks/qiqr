export default function Section({children, title, subtitle,}){
    
    
    return (
    <section className='w-full pb-10'>
    {/* <div className="absolute inset-0 pointer-events-none mb-16" aria-hidden="true"></div>
    <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>§ */}
    <div className='flex flex-col w-full px-4 sm:px-6'>
      <div className="pt-12 md:pt-20 ">
        <div className="w-full md:w-10/12 mx-auto text-center pb-12 md:pb-16">
          <h2 className="text-3xl mb-4">{title}</h2>
          <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
          <div className='w-full text-left'>
            {children}</div>
          </div>
          </div>
        </div>
     </section>
)
    
    
}