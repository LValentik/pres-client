import Link from "next/link";
import { BASE_URL } from "@/app/config";

export default function NextArticle({ article }) {
    return (
        <div className="flex items-center justify-left pb-3 w-full gap-2 border-b border-zinc-200 dark:border-zinc-500 cursor-pointer hover:underline transition-all duration-300 dark:text-zinc-200">
            <Link href={`/articles/${article.attributes.slug}`} className="flex gap-5 items-center justify-left">
                <img
                    src={`${BASE_URL}${article.attributes.featuredImage.data.attributes.url}`}
                    alt={article.attributes.title}
                    className="w-[33%] h-auto"
                    loading="lazy"
                />
                <h2 className="text-base">{article.attributes.title}</h2>
            </Link>
        </div>
    );
}