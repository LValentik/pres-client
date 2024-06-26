import { getHeaderCategories } from '@/lib/api';
import Link from 'next/link';

async function Footer() {
    const categoriesData = await getHeaderCategories();
    const categories = categoriesData.map(category => category.attributes.name);
    return (
        <>
            <footer className="w-full bg-zinc-900 flex flex-col items-center justify-center p-5 text-zinc-200 text-sm">
                <div className="w-11/12 h-fit flex lg:flex-row flex-col items-center justify-around border-b border-zinc-200 lg:pb-5 lg:py-5 py-2 lg:gap-0 gap-5">
                    <div className="flex  gap-5 items-center justify-center">
                        <ul className="text-white flex gap-3">
                            {categories.map((category, index) => (
                                <Link href={`/categories/${category}`} key={index}>
                                    <li>{category}</li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="flex  gap-5 items-center justify-center">
                        <ul className="text-white flex gap-3">
                            <Link href="/contact"><li>Kontakt</li></Link>
                            <Link href="/location"><li>Lokace</li></Link>
                        </ul>
                    </div>
                </div>
                <p className="text-white text-center pt-5">2022 © Smíchovská střední průmyslová škola a gymnázium</p>
                <p className="text-white text-center pt-2">Developed by <a href="https://github.com/ASKhem" className="underline">ASKhem</a></p>
            </footer>
        </>
    )
}

export default Footer; 