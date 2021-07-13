export default function UrlTextField({ name, placeholder, label, value='' }) {
 return (
  <>

   <div className="col-span-3 sm:col-span-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
     {label}
    </label>
    <div className="mt-1 flex rounded-md shadow-sm">
     <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
      http://
     </span>
     <input
      type="text"
      name={name}
      id={name}
      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
      placeholder={placeholder}
      value={value}
     />
    </div>
    </div>
  </>
   )
}