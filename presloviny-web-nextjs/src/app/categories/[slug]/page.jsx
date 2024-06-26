"use client";
import { useEffect, useState } from "react";
import BigTextDot from "@/components/textStyles/BigTextDot";
import ArticlePreview from "@/components/home/ArticlePreview";
import { getArticlesByCategory } from "@/lib/api";
import Pagination from "@/components/pagination/pagination";

export default function CategoryPage({ params }) {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const { slug } = params || {};
    const title = slug ? slug.toUpperCase() : "CATEGORY";

    useEffect(() => {
        const fetchAndSetArticles = async () => {
            try {
                const { articles: fetchedArticles, meta } = await getArticlesByCategory(slug, page, pageSize);
                const sortedArticles = fetchedArticles.sort((a, b) => {
                    const priorityOrder = { main: 1, secondary: 2, third: 3, regular: 4 };
                    return priorityOrder[a.attributes.priority] - priorityOrder[b.attributes.priority];
                });
                setArticles(sortedArticles);
                setTotalPages(Math.ceil(meta.pagination.total / pageSize));
            } catch (error) {
                console.error("Failed to fetch articles", error);
            }
        };

        fetchAndSetArticles();
    }, [slug, page, pageSize]);

    if (!articles.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center pb-10 gap-5">
            <div className="w-full">
                <BigTextDot text={title} />
            </div>

            <section className="flex items-center justify-start w-full gap-5">
                <div className="lg:grid-cols-2 lg:grid items-start justify-start w-full gap-5">
                    <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                        <ArticlePreview article={articles[0].attributes} variant={1} />
                        <div className="flex items-start justify-start w-full gap-3 border-t border-zinc-200 pt-5 mt-3">
                            {articles.slice(7, 8).map((article) => (
                                <ArticlePreview key={article.id} article={article.attributes} variant={3} />
                            ))}
                        </div>
                    </div>
                    <div className="lg:grid-cols-2 lg:grid items-start justify-start w-full gap-5 lg:mt-0 mt-5">
                        <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                            {articles.slice(1, 3).map((article) => (
                                <ArticlePreview key={article.id} article={article.attributes} variant={2} />
                            ))}
                        </div>
                        <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5 lg:pt-0 pt-5">
                            <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                                {articles.slice(4, 6).map((article) => (
                                    <ArticlePreview key={article.id} article={article.attributes} variant={2} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
    );
}