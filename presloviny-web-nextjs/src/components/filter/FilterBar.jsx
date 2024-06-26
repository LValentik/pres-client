"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function FilterBar() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const convertTextToSlug = (text) => {
        return text.toLowerCase().replace(/ /g, '-');
    }
    const keyDawn = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            const slug = convertTextToSlug(search);
            clearInput();
            if (search.length > 0) {
                router.push(`/search/${slug}`);
            }
        }
    }

    const clearInput = () => {
        setSearch('');
    }

    return (
        <div className="relative lg:w-52 w-32">
            <input
                className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-1 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-presloviny-gold focus:border-presloviny-gold focus:shadow-outline"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                onKeyDown={keyDawn}
            />
            <div className="absolute right-0 inset-y-0 lg:flex hidden items-center" onClick={clearInput}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <div className="absolute left-0 inset-y-0 flex items-center" onClick={() => {
                const slug = convertTextToSlug(search);
                clearInput();
                if (search.length > 0) {
                    router.push(`/search/${slug}`);
                }
            }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div >
    );
}
