import Navbar from "../templates/Navbar"
import background from "../images/bg_2.jpg"
import { imgDB, txtDB } from "../firebase"
import { v4 } from "uuid"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useEffect } from "react"
import { addDoc, collection, getDocs } from "firebase/firestore";


export default function Adminsettings() {

    const [quantity, setQuantity] = useState(1)
    const [txt, setTxt] = useState('')
    const [img, setImg] = useState('')
    const [data, setData] = useState([])

    const handleUpload = (e) => {
        console.log(e.target.files[0])
        const imgs = ref(imgDB, `shopImg/${v4()}`)
        uploadBytes(imgs, e.target.files[0]).then(data => {
            console.log(data, "shopImg")
            getDownloadURL(data.ref).then(val => {
                setImg(val)
            })
        })
    }

    const handleClick = async () => {
        const valRef = collection(txtDB, 'txtData')
        await addDoc(valRef, { txtVal: txt, imgUrl: img })
        alert("Data added successfully")
    }

    const getData = async () => {
        const valRef = collection(txtDB, 'txtData')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val => ({ ...val.data(), id: val.id }))
        setData(allData)
        console.log(dataDb)
    }

    useEffect(() => {
        getData()
    })
    console.log(data, "datadata")


    return (
        <div className="overflow-y-auto overflow-x-hidden bg-fixed bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${background})` }}>
            <Navbar />

            <div className="max-w-lg mx-auto pt-20 m-4">
                <div className="flex flex-col p-5 bg-blue-gray-200 gap-5 border-black border border-solid rounded-lg shadow-custom-2">


                    <div className="flex flex-col gap-2 justify-start items-start">

                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" required />

                    </div>

                    <div >
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select product size</label>
                        <select id="countries" className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                            <option>XXL</option>

                        </select>
                    </div>

                    <div >
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Type</label>
                        <select id="countries" className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option>Accessories</option>
                            <option>Food</option>
                            <option>Medicine </option>
                            <option>Toys</option>
                        </select>
                    </div>

                    <div>
                        <label for="quantity-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose quantity:</label>
                        <div className="relative flex items-center max-w-[8rem]">
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-700 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <input value={quantity} type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className=" bg-gray-50 border border-gray-700 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-32 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                            <button onClick={() => setQuantity(quantity + 1)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-700 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>

                    </div>



                    <div>
                        <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Description Here..."></textarea>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                        <input onChange={(e)=>handleUpload(e)} className="block w-full text-sm text-gray-900 border border-gray-700 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" multiple />

                    </div>

                    <button onClick={() => handleClick} type="button" className=" py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>
                    {
                        data.map(value => <div>
                            <h1>{value.txtVal}</h1>
                            <img src={value.imgUrl} height='200px' width='200px' />
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}