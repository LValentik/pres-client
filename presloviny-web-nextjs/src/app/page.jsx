import MainSection from "@/components/home/MainSection";
import CategorySection from "@/components/home/CategorySection";
import BigTextDot from "@/components/textStyles/BigTextDot";
import { getLastMainArticle, getSecondaryArticles, getRegularArticles, getThirdArticles, loadCategoriesBase, getLastMagazine } from "@/lib/api";

export default async function Home() {
  const main = await getLastMainArticle();
  const thirdArticle = await getThirdArticles();
  const magazine = await getLastMagazine();
  const secondaryArticles = await getSecondaryArticles();
  const regularArticle = await getRegularArticles();
  const categories = await loadCategoriesBase();

  return (
    <>
      {
        <div className="w-full">
          <div className="w-full flex flex-col items-center justify-center lg:pb-10 pb-0">
            <div className="lg:w-11/12 w-11/12 flex flex-col justify-center items-center pb-10 gap-5">
              <div className="w-full">
                <BigTextDot text="NEJNOVĚJŠÍ ZPRÁVY" />
              </div>
              <section className="flex items-center justify-start w-full gap-5">
                <MainSection
                  main={main}
                  thirdArticle={thirdArticle || []}
                  secondaryArticles={secondaryArticles || []}
                  magazine={magazine || []}
                  regularArticle={regularArticle || []}
                />
              </section>
            </div>
          </div>
          <CategorySection categories={categories || []} />
        </div>
      }
    </>
  );
}