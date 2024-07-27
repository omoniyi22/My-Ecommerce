import React from "react";
import { ReactSortable } from "react-sortablejs";

const draggableList = [

];

export default function App() {



    const [list, setList] = React.useState(draggableList);

    return (
        <div className="App">
            <button onClick={() => {
                let length = list.length ? list.length : 0

                if (length) {
                    let newNumber = Number(list[list.length - 1]) + 2

                    setList((data) => [...data, newNumber])
                } else {
                    setList((data) => [...data, 1])
                }
            }}>
                Increase
            </button>

            <h1>
                Very Simple Draggable Stuff <>⚛️</>
            </h1>
            <ReactSortable
                filter=".addImageButtonContainer"
                dragClass="sortableDrag"
                list={list}
                setList={setList}
                animation="200"
                easing="ease-out"
            >
                {list.map(item => (
                    <div className="draggableItem">{item}</div>
                ))}
            </ReactSortable>
        </div >
    );
}


{
    Array.isArray(images) && images.map((link, index) => (
        <div key={index} className="relative group draggableItem">
            <img src={link} alt="image" className="object-cover h-32 w-44
        rounded-md p-2" />
            <button className="absolute top-0 right-0" />
        </div>
    ))
}


async function uploadImages(ev) {
    const files = await ev.target?.files;
    try {
        if (files?.length > 0) {
            setIsUploading(true)
            for (const file of files) {
                const data = new FormData();
                data.append("file", file);

                uploadImagesQueue.push(
                    axios.post("/api/upload", data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }
            let response = await Promise.all(uploadImagesQueue)
            console.log(response)

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




{
    !isUploading && (
        <div className="grid grid-cols-2 gap-4">
            <ReactSortable
                list={Array.isArray(images) ? images : []}
                animation={200}
                className="grid grid-cols-2 gap-4"
                // filter=".addImageButtonContainer"
                dragClass="sortableDrag"
                setList={setImageList}
                easing="ease-out"
            >

                {Array.isArray(images) && images.map((link, index) => (
                    <div key={index} className="relative group draggableItem">
                        <img src={link} alt="image" className="object-cover h-32 w-44
                        rounded-md p-2" />
                        <button className="absolute top-0 right-0" />
                    </div>
                ))}


            </ReactSortable>

        </div>
    )
}


async function uploadImages(ev) {
    const files = await ev.target?.files;
    try {
        if (files?.length > 0) {
            setIsUploading(true)
            for (const file of files) {
                const data = new FormData();
                data.append("file", file);

                uploadImagesQueue.push(
                    axios.post("/api/upload", data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }
            let response = await Promise.all(uploadImagesQueue)
            console.log(response)

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