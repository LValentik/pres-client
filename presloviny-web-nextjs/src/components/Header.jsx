"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HamburguerMenu from './HamburguerMenu';
import { getHeaderCategories } from '@/lib/api';
import FilterBar from './filter/FilterBar';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const hour = new Date().getHours();
            const isNightTime = hour >= 23 || hour < 6;
            return sessionStorage.getItem('darkMode') === 'true' || isNightTime;
        }
        return false;
    });

    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoriesData = await getHeaderCategories();
                const categoryNames = categoriesData.map(category => category.attributes.name);
                setCategories(categoryNames);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setCategories([]);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        sessionStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const categoriesToUpperCase = categories.map(category =>
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    );

    return (
        <header className="fixed w-full bg-presloviny-blue dark:bg-zinc-300 z-20 flex items-center justify-center text-sm text-bold dark:font-semibold">
            <div className="w-11/12 h-14 py-2 flex items-center justify-between">
                <div className="lg:w-8/12 w-1/3 flex items-center lg:gap-5 gap-2">
                    <HamburguerMenu categories={categories} />
                    <Link href="/">
                        <img src="/img/logos/companyLogo.svg" alt="logo" className="lg:flex hidden lg:w-36 w-32 cursor-pointer bg-white" />
                        <img src="/favicon.ico" alt="logo" className="lg:hidden w-8 cursor-pointer bg-white" />
                    </Link>
                    <ul className="md:h-14 h-10 xl:flex hidden items-center justify-around gap-5">
                        <li className="cursor-pointer text-white dark:text-black dark:hover:text-presloviny-gold hover:text-presloviny-gold transition-all duration-200">
                            <Link href="/">Domů</Link>
                        </li>
                        {categoriesToUpperCase.map((category) => (
                            <li key={category} className="cursor-pointer text-white dark:text-black dark:hover:text-presloviny-gold hover:text-presloviny-gold transition-all duration-200">
                                <Link href={`/categories/${category.toLowerCase()}`}>{category}</Link>
                            </li>
                        ))}
                        <li className="long-hidden cursor-pointer text-white dark:text-black dark:hover:text-presloviny-gold hover:text-presloviny-gold transition-all duration-200">
                            <Link href="/magazines">Časopisy</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center justify-end lg:w-4/12 w-2/3 h-12 gap-3 text-white dark:text-black">
                    <Link href="/contact" className="lg:flex hidden cursor-pointer text-white dark:text-black dark:hover:text-presloviny-gold hover:text-presloviny-gold transition-all duration-200">Kontakt</Link>
                    <FilterBar />
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="h-10 w-10 rounded-lg p-2 "
                    >
                        <svg className={`fill-violet-700 hover:fill-presloviny-gold ${darkMode ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg className={`fill-black hover:fill-presloviny-ligthBlue ${darkMode ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fillRule="evenodd" clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>

                </div>
            </div>
        </header>
    );
}