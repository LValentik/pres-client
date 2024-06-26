import Link from "next/link";

export default function RegularArticle({ article }) {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 cursor-pointer hover:underline transition-all duration-300 dark:text-zinc-200">
            <Link href={`/articles/${article.attributes.slug}`}>
                <h2 className="text-base">{article.attributes.title}</h2>
            </Link>
        </div>
    );
}