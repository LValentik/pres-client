import CategoryBoard from "@/components/home/CategoryBoard";
import BigTextDot from "@/components/textStyles/BigTextDot";

export default function CategorySection({ categories }) {
    return (
        <div className="relative w-full flex flex-col items-center justify-start bg-zinc-200 py-5">
            <img
                src="/img/backgrounds/background.png"
                alt="Background image for categories"
                className="absolute inset-0 w-full h-full object-cover z-0"
                loading="lazy"
            />
            <div className="w-11/12 flex flex-col items-start justify-start gap-10 relative z-10 min-h-[78vh]">
                <div className="w-full">
                    <BigTextDot text="KATEGORIE" type="white" />
                </div>
                <section className="w-full grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pb-14">
                    {categories.map((category, index) => (
                        <CategoryBoard
                            key={index}
                            category={category.attributes.name}
                            page={1}
                            pageSize={3}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
}