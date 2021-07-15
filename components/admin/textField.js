import {useState,useEffect} from 'react'
export default function TextField(props) {

    


    const style = props.readonly? 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md  bg-gray-100 cursor-not-allowed':'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md '
    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
                   {props.label}
                </label>
                <input
                    type="text"
                    name={props.name}
                    id={props.name}
                    placeholder={props.placeholder}
                    className={style}
                    value={props.value || ''} 
                    readOnly={props.readonly}
                    onChange={(e)=>props.onChange(e)}
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
 
                />
            </div>
            
        </>
    )
}