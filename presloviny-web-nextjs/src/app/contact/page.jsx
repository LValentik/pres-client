import { MdEmail } from "react-icons/md";
import BigTextDot from "@/components/textStyles/BigTextDot";
import { RiTeamFill } from "react-icons/ri";
import { getAuthors } from "@/lib/api";
import Link from "next/link";
import MemberCard from "@/components/cards/MemberCard";
import { getContactInfo } from "@/lib/api";

export default async function Contact() {
    const authors = await getAuthors();
    const contactInfo = await getContactInfo();

    const authorWithPosition1 = authors && authors.find((author) => author.attributes.position == 1);
    const authorWithPosition2 = authors && authors.find((author) => author.attributes.position == 2);

    const otherAuthors = authors && authors
        .filter((author) => author.attributes.position > 2)
        .sort((a, b) => a.attributes.position - b.attributes.position);

    return (
        <div className="lg:w-11/12 w-full flex flex-col lg:items-start items-center justify-center gap-10 lg:pb-10">
            <div className="w-11/12 flex"><BigTextDot text="Kontakt" /></div>

            <div className="w-full flex flex-wrap items-center lg:justify-between justify-center  dark:text-zinc-200 gap-5 bg-zinc-200 dark:bg-slate-800 min-h-32 p-5">
                <div className="flex items-center justify-center gap-2 text-3xl">
                    <MdEmail /> <p>{contactInfo && contactInfo.attributes.email}</p>
                </div>
                <div className="flex items-center gap-10">
                    <Link href="/joinForm">
                        <button className="lg:w-52 w-40 py-3 text-center text-white transition-all rounded-md shadow-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-translate-y-px">
                            Připojit se
                        </button>
                    </Link>
                </div>

            </div>
            <div className="w-full flex flex-col  items-start gap-5 min-h-screen text-black dark:text-zinc-200 lg:rounded-2xl p-5">
                <div className="flex gap-5">
                    <RiTeamFill className="text-3xl" />
                    <h2 className="text-3xl ">Tým</h2>
                </div>
                <div className="w-full flex items-center justify-center :lg:gap-24 gap-10 text-black flex-wrap">
                    {authorWithPosition1 && (
                        <MemberCard author={authorWithPosition1} />
                    )}
                    {authorWithPosition2 && (
                        <MemberCard author={authorWithPosition2} />
                    )}
                </div>
                <div className="w-full flex flex-wrap items-center justify-center gap-10 mt-10">
                    {otherAuthors && otherAuthors.length > 0 && (
                        otherAuthors.map((author) => (
                            <MemberCard key={author.id} author={author} />
                        ))
                    )}
                </div>
            </div >
        </div >
    );
}