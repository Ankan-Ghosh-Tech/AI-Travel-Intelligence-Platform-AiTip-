export function BusinessTravel({ title }) {
    return (
        <div className="mt-10 flex flex-col items-center text-center py-30">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-2 text-gray-500">Where is work taking you?</p>

            <div className="mt-6 flex w-full max-w-lg">
                <input
                    type="text"
                    placeholder="Search city, office, or destination..."
                    className="w-full rounded-l-lg border p-4 outline-none focus:border-blue-600"
                />
                <button className="rounded-r-lg bg-blue-600 px-8 font-semibold text-white transition-colors hover:bg-blue-700">
                    Search
                </button>
            </div>
        </div>
    );
}