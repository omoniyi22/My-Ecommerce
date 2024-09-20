import Product from "@/components/Product";

export default function NewProduct() {
    return (
        <div className="sm:flex flex-col *:sm:items-center sm:justify-between py-3">
            <div className="text-center sm:text-left pb-4">
                <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                    Let&rsquo;s create a new product! 🎉
                </p>
            </div>

            <hr class="h-px border-0 bg-gray-500" />

            <div className="my-10">
                <Product />
            </div>
        </div>



    )
}
