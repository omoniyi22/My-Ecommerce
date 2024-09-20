import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Spinner from "./Spinner"
import { ReactSortable } from 'react-sortablejs';
import toast from "react-hot-toast";

export default function Product({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages
}) {


    const router = useRouter()
    const [redirect, setRedirect] = useState(false)
    const [title, setTitle] = useState(existingTitle || "")
    const [description, setDescription] = useState(existingDescription || "")
    const [price, setPrice] = useState(existingPrice || "")
    const [images, setImages] = useState(existingImages || [])
    const [isUploading, setIsUploading] = useState(false)

    const [imageList, setImageList] = useState([])

    let uploadImagesQueue = []

    const createProject = async (ev) => {
        ev.preventDefault()

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        let stringUrls = [...images].map((link) => Object.keys(link)
            .filter(key => !isNaN(key))
            .map(key => link[key])
            .join(''))

        const data = { title, description, price, images: stringUrls }
        if (_id) {
            await axios
                .put("/api/products", { ...data, _id })
            toast.success("Product Updated")

        } else {
            await axios.post('/api/products', data)
            toast.success("Product Created!")
        }
        setRedirect(true)
    }

    async function uploadImages(ev) {
        const files = await ev.target?.files;
        try {
            if (files?.length > 0) {
                setIsUploading(true)
                for (const file of files) {
                    const data = new FormData();
                    data.append("file", file);
                    // let oldImages = [...images]
                    uploadImagesQueue.push(
                        axios.post("/api/upload", data).then(res => {
                            let res_data_links = res.data.links
                            setImages(oldImages => ([...oldImages, ...res_data_links]))
                        })
                    )
                }

                await Promise.all(uploadImagesQueue)
                uploadImagesQueue = []

                setIsUploading(false)
            } else {
                setIsUploading(false)
                return 'An error Occured'
            }


        } catch (error) {
            setIsUploading(false)
            console.log(error)
        } finally {
            setIsUploading(false)

        }
    }
    useEffect(() => {
        console.log({ images })
        return () => {

        }

    }, [images])


    if (redirect) {
        router.push('/products')
        return null
    }


    function updateImageOrder(Images) {
        setImages(Images)
    }

    function handleDeleteImage(index) {
        const updateImage = [...images];
        updateImage.splice(index, 1);
        setImages(updateImage)
    }

    return (
        <>
            <form onSubmit={createProject} className="mx-auto max-w-screen-sm">
                <div className="mx-auto my-4">
                    <div>
                        <label for="example1" class="mb-1 block text-lg font-medium text-gray-700 py-1">Title</label>
                        <input type="text" id="example1" class="block w-full rounded-md
                         border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
                         focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed
                          disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
                            placeholder="Product Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <div>
                        <label for="example1" class="mb-1 block text-lg font-medium text-gray-700 py-1">Select Category</label>
                        <select class="block w-full rounded-md border w-100
                         border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
                         focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed
                          disabled:bg-gray-50 disabled:text-gray-500 p-3 "
                            placeholder="Product Description">
                            <option value={""}>No category</option>
                            <option value={""}>Option02</option>
                            <option value={""}>Option03</option>
                        </select>
                    </div>
                </div>
                {/* </div> */}

                <div className="mx-auto my-4">
                    <div class="mx-auto">
                        <label for="example5" class="mb-1 block text-sm font-medium text-gray-700 py-1">Images</label>
                        <label class="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-blue-300 p-6 transition-all hover:border-primary-300">
                            <div class="space-y-1 text-center">
                                <div class="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-gray-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                </div>
                                <div class="text-gray-600"><a href="#" class="font-medium text-primary-500 hover:text-primary-700">Click to upload</a> or drag and drop</div>
                                <p class="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                            </div>
                            <input id="fileInput" type="file" className="hidden" accept="image/*"
                                multiple onChange={uploadImages} />
                        </label>
                    </div>

                </div>

                <div className="grid grid-cols-2 item-center rounded">
                    {
                        isUploading && < Spinner className="px-4 mx-auto absolute top-1/2 left-1/2 
                        transform -translte-x-1/2 -translate-y-1/2"/>
                    }
                </div>

                {
                    !isUploading && (
                        <div className="grid grid-cols-2 gap-4">
                            <ReactSortable
                                // filter=".addImageButtonContainer"
                                list={Array.isArray(images) ? images : []}
                                setList={setImages}
                                animation={200}
                                className="grid grid-cols-2 gap-4"
                            // dragClass="sortableDrag"
                            // easing="ease-out"
                            >

                                {Array.isArray(images) && images.map((link, index) => (
                                    <div key={link} className=" relative group ">
                                        <img src={Object.keys(link)
                                            .filter(key => !isNaN(key))
                                            .map(key => link[key])
                                            .join('')} alt="image" className="object-cover h-32 w-44 rounded-md p-2" />
                                        <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                                            <button onClick={() => handleDeleteImage(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>

                                            </button>
                                        </div>
                                    </div>
                                ))}


                            </ReactSortable>

                        </div>
                    )
                }



                <div className="mx-auto my-4">
                    <div>
                        <label for="example1" class="mb-1 block text-lg font-medium text-gray-700 py-1">Description</label>
                        <textarea rows={5} id="example1" class="block w-full rounded-md
                         border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
                         focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed
                          disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
                            placeholder="Product Description"

                            value={description}
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </div>

                <div className="mx-auto my-4">
                    <div>
                        <label for="example1" class="mb-1 block text-lg font-medium text-gray-700 py-1">Price</label>
                        <input type="number" id="example1" class="block w-full rounded-md
                         border-gray-300 shadow-sm focus:border-primary-400 focus:ring 
                         focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed
                          disabled:bg-gray-50 disabled:text-gray-500 p-3 border"
                            placeholder="Product Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>



                <div class="mx-auto my-4">
                    <button
                        className="inline-block rounded border border-green-600 px-12 py-3.5  text-sm font-medium text-green-600
                    hover:bg-green-600 hover:text-white focus:outline-none focus:ring active:bg-green-500 w-full"
                        type="submit">
                        Save Product
                    </button>
                </div>
            </form >
        </>
    )
} 