export default function LoadingAnimation() {
    return (
        <div className="flex items-center justify-center gap-5 text-zinc-200">
            <div className="border-gray-300 h-16 w-16 animate-spin rounded-full border-8 border-t-zinc-700" />
            <p className="text-lg">Loading data ...</p>
        </div>
    )
}

