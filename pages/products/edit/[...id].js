import Product from "@/components/Product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditProduct() {
    const router = useRouter()
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null)

    useEffect(() => {
        if (!id) {
            return
        } else {
            axios.get("/api/products?id=" + id)
                .then(response => {
                    setProductInfo(response.data)
                }).catch(err => { console.log({ err }) })
        }
    }, [id])

    return (
        <div className="sm:flex flex-col *:sm:items-center sm:justify-between py-3">
            <div className="text-center sm:text-left pb-4">
                <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                    Editing {productInfo?.title}
                    {/* Let's create a new product! 🎉 */}
                </p>
            </div>

            <hr class="h-px border-0 bg-gray-500" />

            <div className="my-10">
                {productInfo && (
                    <Product {...productInfo} />
                )}
            </div>
        </div>
    )
}
