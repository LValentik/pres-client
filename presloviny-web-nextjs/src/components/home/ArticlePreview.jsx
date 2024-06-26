import { BASE_URL } from "@/app/config";
import Link from "next/link";

export default function ArticlePreview({ article, variant }) {

    if (!article) {
        return <p>Soon...</p>;
    }

    const getVariantStyles = (variant) => {
        switch (variant) {
            case 1:
                return {
                    container: "col-span-1 flex flex-col items-start justify-start w-full gap-5 cursor-pointer hover:underline transition-all duration-300",
                    link: "flex flex-col gap-5",
                    imgClass: "w-full",
                    titleClass: "lg:text-4xl text-xl font-bold",
                    linkHref: `/articles/${article.slug}`
                };
            case 2:
                return {
                    container: "flex flex-col items-start justify-start w-full gap-2 cursor-pointer hover:underline transition-all duration-300",
                    link: "",
                    imgClass: "w-full",
                    titleClass: "text-lg font-bold",
                    linkHref: `/articles/${article.slug}`
                };
            case 3:
                return {
                    container: "flex items-start justify-left pb-3 w-full gap-2 border-b border-zinc-200 cursor-pointer hover:underline transition-all duration-300 ",
                    link: "flex gap-5 items-start justify-left",
                    imgClass: "lg:w-[30%] w-[40%]",
                    titleClass: "text-base",
                    linkHref: `/articles/${article.slug}`
                };
            default:
                return {};
        }
    };

    const styles = getVariantStyles(variant);

    return (
        <div className={`${styles.container} + hover:brightness-[80%] transition-all duration-300 dark:text-zinc-200 dark:border-zinc-800`}>
            <Link href={styles.linkHref} className={styles.link}>
                {variant == 1 && (
                    <h2 className={styles.titleClass}>{article.attributes?.title || article.title}</h2>
                )}
                <img
                    src={article.featuredImage && article.featuredImage.data
                        ? `${BASE_URL}${article.featuredImage.data.attributes.url}`
                        : 'No image available'}
                    alt="image"
                    className={styles.imgClass}
                />
                {variant != 1 && (
                    <h2 className={styles.titleClass}>{article.attributes?.title || article.title}</h2>
                )}
            </Link>
        </div>
    );
}