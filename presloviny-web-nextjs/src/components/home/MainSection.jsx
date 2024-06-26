import RegularArticle from "@/components/home/RegularArticle";
import ArticlePreview from "@/components/home/ArticlePreview";
import Link from "next/link";
import { BASE_URL } from "@/app/config";
import { TbPointFilled } from "react-icons/tb";

export default function MainSection({ main, thirdArticle = [], secondaryArticles = [], magazine, regularArticle = [] }) {

    return (
        <div className="lg:grid-cols-2 lg:grid items-start justify-start w-full gap-5 min-h-[78vh]">
            <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                {main && (
                    <ArticlePreview article={main} variant={1} />
                )}
                <div className="flex flex-col items-start justify-start w-full gap-3 border-t border-zinc-200 pt-5 mt-3">
                    {thirdArticle.map((article) => (
                        <ArticlePreview key={article.id} article={article.attributes} variant={3} />
                    ))}
                </div>
            </div>
            <div className="lg:grid-cols-2 lg:grid items-start justify-start w-full gap-5 lg:mt-0 mt-5">
                <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                    {secondaryArticles.map((article) => (
                        <ArticlePreview key={article.id} article={article.attributes} variant={2} />
                    ))}
                </div>
                <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5 lg:pt-0 pt-5">
                    {magazine && magazine.cover && magazine.cover.data && (

                        <Link href="/magazines">
                            <div className="flex flex-col items-start justify-start w-full gap-2 border-b border-zinc-200 pb-10">
                                <img
                                    src={BASE_URL + magazine.cover.data.attributes.url}
                                    alt="Cover of the latest magazine"
                                    className="w-full h-auto"
                                />
                                <h2 className="text-lg font-bold flex items-center justify-center dark:text-zinc-200">
                                    <TbPointFilled className="text-presloviny-gold text-2xl" />
                                    POSLEDNÍ ČASOPIS
                                </h2>
                            </div>
                        </Link>
                    )}
                    <div className="col-span-1 flex flex-col items-start justify-start w-full gap-5">
                        {regularArticle.map((article) => (
                            <RegularArticle key={article.id} article={article} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}