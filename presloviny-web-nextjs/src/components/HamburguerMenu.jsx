"use client"
import { IoMenuSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";
import Link from "next/link";

function HamburguerMenu({ categories }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    const categoriesToUpperCase = categories.map(category =>
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    );

    return (
        <div className="xl:hidden flex">
            <div className="text-white dark:text-black cursor-pointer hover:text-presloviny-gold transition-all duration-200">
                <IoMenuSharp onClick={toggleMenu} className="text-4xl" />
            </div>

            {isOpen && (
                <div
                    className="absolute top-12 left-0 w-screen h-[95vh] bg-presloviny-blue mt-2 bg-opacity-95 flex flex-col transition-all duration-300 ease-in-out opacity-100 translate-x-0 gap-10 p-10"
                    onMouseLeave={toggleMenu}
                >
                    <span className="text-4xl w-11/12 flex items-center justify-end text-zinc-200 hover:text-presloviny-gold transition-all duration-200">
                        <RxCross2 onClick={toggleMenu} />
                    </span>
                    <ul className="flex flex-col gap-5">
                        <Link href="/">
                            <li className="cursor-pointer text-xl text-white hover:text-presloviny-gold transition-all duration-200 flex items-center justify-center gap-5 border-b border-zinc-200 dark:border-zinc-500 pb-5">
                                <span className="w-24">Domů</span>
                            </li>
                        </Link>
                        <div className="grid grid-cols-2 gap-3">
                            {categoriesToUpperCase.map((category, index) => (
                                <Link href={`/categories/${categories[index]}`} key={index}>
                                    <li
                                        className="cursor-pointer text-xl text-white hover:text-presloviny-gold transition-all duration-200 flex items-center justify-center gap-5"
                                        onClick={toggleMenu}
                                    >
                                        <span className="w-24">{category}</span>
                                    </li>
                                </Link>
                            ))}
                        </div>

                        <Link href="/magazines">
                            <li className="cursor-pointer text-xl text-white hover:text-presloviny-gold transition-all duration-200 flex items-center justify-center gap-5 border-t border-zinc-200 dark:border-zinc-500 pt-5"
                                onClick={toggleMenu}
                            >
                                <span className="w-24">Časopisy</span>
                            </li>
                        </Link>
                        <Link href="/contact/">
                            <li className="cursor-pointer text-xl text-white hover:text-presloviny-gold transition-all duration-200 flex items-center justify-center gap-5 border-t border-zinc-200 dark:border-zinc-500 pt-5"
                                onClick={toggleMenu}
                            >
                                <span className="w-24">Kontakt</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default HamburguerMenu;