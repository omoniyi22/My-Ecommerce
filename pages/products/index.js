import Link from "next/link";

export default function Products() {
    return (
        <>
            <header className="bg-indigo">
                <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
                    <div className="sm:flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                                All Products
                            </h1>

                            <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                                Let's create a new product! 🎉
                            </p>
                        </div>

                        <div className="mt-4 flex flex-col items-center gap-4 sm:mt-0 sm-flex-row sm:items-center">

                            <Link
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-600 px-5 py-3 text-green-700  font-medium transition hover:text-green-700 hover:bg-green-50 focus:outline-none focus:ring"
                                type="button"
                                href="/products/new"
                            >
                                <span className="text-md font-medium">Create Products</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <hr class="my-1 h-px border-0 bg-gray-300" />


            <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:py-12 lg:px-8">
                no products
            </div>
        </>
    )
}