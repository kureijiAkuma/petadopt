import React, { useEffect, useState } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";
import img from "../images/dogtoy_2.jpg";
import minus from "../icons/minus.svg";
import { getDoc, doc, collection } from "firebase/firestore";
import { DB } from "../firebase";

export default function ItemCart({ onToggleItem, item, onDeleteItem, index }) {
    const [product, setProduct] = useState([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const loadProductData = async () => {
            try {
                const productDocRef = doc(collection(DB, "shopitems"), item.docId);
                const productDocSnap = await getDoc(productDocRef);

                if (productDocSnap.exists()) {
                    const data = productDocSnap.data();
                    if (data) {
                        setProduct(data);
                    }
                }
            } catch (error) {
                console.error("Error loading product data:", error);
            }
        };
        if (item.docId) {
            loadProductData();
        }
    }, [item.docId]);

    const totalItemPrice = product.price * item.quantity;

    const handleToggleCheckbox = () => {
        setChecked(prevChecked => !prevChecked);
        onToggleItem(totalItemPrice, !checked, index, item.docId );
    };

    const handleDeleteButtonClick = () => {
        if (checked) {
            onToggleItem(totalItemPrice, false);
        }
        onDeleteItem(index);
    };
    
    return (
        <div className="min-w-full bg-orange-200 py-4 px-5 border border-black/50 rounded">
            <div className="flex">
                <div className="mr-4 flex items-center">
                    <img src={product.thumbnailUrl} className="size-20" alt="" />
                </div>
                <div>
                    <div className="flex justify-start items-center mb-2 gap-2">
                        <h1 className="font-Roboto font-bold text-lg">{product.name}</h1>
                        <Checkbox checked={checked} onChange={handleToggleCheckbox} />
                        <div className="ml-auto flex w-fit">
                            <button 
                            onClick={handleDeleteButtonClick}
                            className="w-fit h-fit px-0 py-0  bg-red-700 rounded hover:bg-red-500 active:bg-red-600">
                                <img className="size-5" src={minus} alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-evenly gap-10">
                        <div>
                            <h2 className="font-Roboto font-normal text-base text-gray-800">
                                Color
                            </h2>
                            <div
                                className={`w-5 h-5 `}
                                style={{ backgroundColor: item.color }}
                            ></div>
                        </div>
                        <div>
                            <h2 className="font-Roboto font-normal text-base text-gray-800">
                                Size
                            </h2>
                            <h2>{item.size}</h2>
                        </div>
                        <div>
                            <h2 className="font-Roboto font-normal text-base text-gray-800">
                                Quantity
                            </h2>
                            <h2>{item.quantity}</h2>
                        </div>
                        <div>
                            <h2 className="font-Roboto font-normal text-base text-gray-800">
                                Per Unit
                            </h2>
                            <h2>₱{product.price}</h2>
                        </div>
                        <div>
                            <h2 className="font-Roboto font-normal text-base text-gray-800">
                                Total
                            </h2>
                            <h2>₱{totalItemPrice}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
