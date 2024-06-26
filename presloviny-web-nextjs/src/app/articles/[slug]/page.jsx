import { getArticleBySlug, getAuthorById } from '@/lib/api';
import { BASE_URL } from '@/app/config';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function ArticlePage({ params }) {
    const { slug } = params;
    const article = await getArticleBySlug(slug);

    if (!article || !article.author || !article.author.data) {
        return <p>Author information is not available</p>;
    }

    const author = await getAuthorById(article.author.data.id);

    const publishedDate = new Date(article.publishedAt).toLocaleDateString('cs-CZ', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    return (
        <div className="w-full min-h-screen flex flex-col items-start justify-center lg:gap-10 gap-5 text-base">
            <div className="w-full flex flex-col gap-5">
                <h1 className="lg:text-5xl text-2xl font-bold dark:text-zinc-200">{article.title}</h1>
                {article.summary && <h2 className="text-xl">{article.summary}</h2>}
                <div className="flex items-start gap-3">
                    <img src={`${BASE_URL}${author?.attributes.picture?.data.attributes.url}`} alt={author.name} className="w-10 h-10 rounded-full" />
                    <div className="flex flex-col dark:text-zinc-200">
                        <p className="text-sm"> {author.attributes.name}, Presloviny</p>
                        <p className="text-sm"> {publishedDate} </p>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <img
                    src={`${BASE_URL}${article?.featuredImage?.data?.attributes?.url}`}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                {article?.featuredImage?.data?.attributes?.caption && (
                    <p className="text-center text-sm text-gray-500 mt-2 dark:text-zinc-200">
                        {article.featuredImage.data.attributes.caption}
                    </p>
                )}
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="w-full lg:w-10/12 flex flex-col gap-5 dark:text-zinc-200">
                    <BlocksRenderer content={article.content} />
                </div>
            </div>
        </div>
    );
}