"use client";
import { useState, useEffect } from "react";
import { getArticlesBySearchOrContent, getAllArticlesByTitle } from "@/lib/api";
import Pagination from "@/components/pagination/pagination";
import ArticlePreview from "@/components/home/ArticlePreview";
import { getAllArticlesByContentAndTitle } from "@/lib/api";

export default function SearchPage({ params }) {
    const { slug } = params || {};
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const convertSlugTextToArray = (slug) => {
        const decodedSlug = decodeURIComponent(slug);
        return decodedSlug.split('-');
    }

    const slugArray = convertSlugTextToArray(slug);
    const searchText = slugArray.join(' ');
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { articles: fetchedArticles, meta } = await getArticlesBySearchOrContent(searchText, page, pageSize);
                setResults(fetchedArticles);
                setTotalPages(Math.ceil(meta.pagination.total / pageSize));
                const totalResults = await getAllArticlesByContentAndTitle(searchText);
                setTotalResults(totalResults);
            } catch (error) {
                console.error(error);
            }
        }
        fetchArticles();
    }, [searchText, page, pageSize])

    return <div className="w-11/12 min-h-screen">
        <div className="flex  items-start pb-10">
            <div className="lg:w-full w-full flex flex-col items-start justify-center ">
                {/* <div className="w-full flex flex-col items-start justify-center lg:hidden lg:pt-10 pt-5">
                    <div className="w-full h-40 bg-zinc-200 flex items-center justify-center">
                        ADD SPACE
                    </div>
                </div> */}
                <div className="flex items-center lg:w-3/6 w-full border-b-[5px] border-presloviny-gold lg:py-5 py-3">
                    <h1 className="text-xl font-bold">{totalResults} results for: {searchText}</h1>
                </div>
                {
                    totalResults > 0 && (
                        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                    )
                }
                <div className="grid lg:grid-cols-2 grid-cols-1 items-start justify-center gap-5">
                    {results.map((article) => (
                        <ArticlePreview article={article.attributes} key={article.id} variant={3} />
                    ))}
                </div>

                {/* <div className="w-full flex flex-col items-start justify-center pt-10">
                    <div className="w-full h-40 bg-zinc-200 flex items-center justify-center">
                        ADD SPACE
                    </div>
                </div> */}
            </div>
            {/* <div className="w-4/12 lg:flex flex-col items-start justify-center p-10 hidden">
                <div className="w-full h-[600px] bg-zinc-200 flex items-center justify-center">
                    ADD SPACE
                </div>
            </div> */}
        </div>
    </div>;
}
