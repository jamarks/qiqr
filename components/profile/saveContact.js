export default function SaveContact(){
    return (
        <>
        <button aria-label="save" className="text-blue-900 focus:outline-none focus:text-gray-400 hover:text-gray-400  text-gray-600 dark:text-gray-400  cursor-pointer mr-4">
              <svg className="feather feather-bookmark" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
        </>
    )
}