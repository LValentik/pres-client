import { loadCategoriesBase } from "@/lib/api";
import CategorySection from "@/components/home/CategorySection";

export default async function CategoriesLayout({ children }) {
    const categories = await loadCategoriesBase();

    return (
        <>
            <div className="w-11/12">
                <div className="w-full flex flex-col items-center justify-center lg:pb-10 pb-0">
                    <div className="w-full min-h-screen flex flex-col justify-start items-center pb-10 gap-5">
                        {children}
                    </div>
                </div>
            </div>
            <CategorySection categories={categories} />
        </>
    );
}