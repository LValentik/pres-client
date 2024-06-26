import { getLast6Articles } from '@/lib/api';
import NextArticle from "@/components/home/NextArticle";

export default async function ArticleLayout({ children }) {
    const articles = await getLast6Articles();

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center lg:pb-10 pb-0">
            <section className="lg:w-8/12 w-10/12 pt-10 flex items-center pb-20">{children}</section>
            <section className="lg:w-8/12 w-10/12 flex flex-col justify-center items-start gap-5 border-t border-zinc-200 pb-10" >
                <h2 className="text-2xl font-bold py-5 dark:text-zinc-200">VÍCE ZPRÁV</h2>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    {
                        Array.isArray(articles) && articles.length > 0 ? (
                            articles.map((article, index) => (
                                <NextArticle article={article} key={index} />
                            ))
                        ) : (
                            <p>No articles available</p>
                        )
                    }
                </div>
            </section>
        </div>
    );
}
