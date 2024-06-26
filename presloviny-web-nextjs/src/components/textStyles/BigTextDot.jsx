import { TbPointFilled } from "react-icons/tb";

export default function BigTextDot({ text, type }) {
    return (
        <div className="flex items-center lg:w-3/6 w-full border-b-[5px] border-presloviny-gold lg:py-5 py-3">
            <TbPointFilled className="text-presloviny-gold text-3xl" />
            <h2 className={`text-lg font-bold ${type ? "text-zinc-200" : "dark:text-zinc-200"}`}>{text}</h2>
        </div>
    );
}