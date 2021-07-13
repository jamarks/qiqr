export default function textField({ name, placeholder, label, value='', readonly=false, required='false',size='2', textChange}) {
    
    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                   {label}
                </label>
                <input
                    type="text"
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={value} 
                    readOnly={readonly}
                    onChange={textChange}
 
                />
            </div>
            
        </>
    )
}