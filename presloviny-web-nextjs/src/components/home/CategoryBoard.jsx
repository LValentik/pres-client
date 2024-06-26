import { getArticlesByCategorie } from "@/lib/api";
import { BASE_URL } from "@/app/config";
import Link from "next/link";

export default async function CategoryBoard({ category, page, pageSize }) {
    const articles = await getArticlesByCategorie(category, page, pageSize);
    return (
        <div className="w-full bg-zinc-50 py-3 dark:bg-opacity-5 backdrop-blur-lg">
            <div className="w-full">
                <h3 className="text-base font-bold bg-presloviny-gold w-24 flex justify-center items-center">{category}</h3>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                {articles.map((article, index) => (
                    index < 1 ? (
                        <div key={index} className="w-full cursor-pointer">
                            <Link href={`/articles/${article.attributes.slug}`} legacyBehavior>
                                <a className="flex flex-col items-start">
                                    <img
                                        src={BASE_URL + article.attributes.featuredImage.data.attributes.url}
                                        alt={article.attributes.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy" // Mejora el rendimiento al cargar imágenes de forma diferida
                                    />
                                    <h4 className="p-2 min-h-12 border-b border-zinc-200 dark:border-zinc-500 hover:underline dark:text-zinc-200">
                                        {article.attributes.title}
                                    </h4>
                                </a>
                            </Link>
                        </div>
                    ) : (
                        <div key={index} className="w-full hover:underline cursor-pointer">
                            <Link href={`/articles/${article.attributes.slug}`} legacyBehavior>
                                <a>
                                    <h4 className="p-2 min-h-12 border-b border-zinc-200 dark:border-zinc-500 dark:text-zinc-200 hover:underline">
                                        {article.attributes.title}
                                    </h4>
                                </a>
                            </Link>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}