import React, { useEffect, useState } from "react";
import { doc, collection, getDoc, onSnapshot } from "firebase/firestore";
import { DB } from "../firebase";

export default function TableRow({ purchase }) {
    const { id, items } = purchase;
    const [buyername, setBuyerName] = useState("");
    const [productNames, setProductNames] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userDocRef = doc(collection(DB, "users"), id);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData) {
                        setBuyerName(userData.username);
                    }
                }

                const promises = items.map(async (item) => {
                    const productDocRef = doc(collection(DB, "shopitems"), item.docId);
                    const productDocSnap = await getDoc(productDocRef);

                    if (productDocSnap.exists()) {
                        const productData = productDocSnap.data();
                        if (productData) {
                            return productData.name;
                        }
                    }
                    return null;
                });

                const productNames = await Promise.all(promises);
                setProductNames(productNames.filter(name => name !== null));
            } catch (error) {
                console.log(error);
            }
        };

        loadUserData();

        // Subscribe to real-time updates for the purchase
        const unsubscribe = onSnapshot(doc(collection(DB, "purchases"), id), (doc) => {
            if (doc.exists()) {
                const purchaseData = doc.data();
                if (purchaseData) {
                    setStatuses(purchaseData.items.map(item => item.status));
                }
            }
        });

        // Cleanup function to unsubscribe from real-time updates
        return () => unsubscribe();
    }, [id, items]);

    return (
        <>
            {items.map((item, index) => (
                <tr key={index}>

                    <td className="text-center">{productNames[index]}</td>


                    
                    <td className="text-center">
                        <div
                            className={`w-10 h-5 rounded ring-blue-gray-900 ring-1 m-auto`}
                            style={{ backgroundColor: item.color }}>
                        </div>
                    </td>
                    <td className="text-center">{item.variety}</td>
                    <td className="text-center">{item.size}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">{item.timestamp.toDate().toLocaleString()}</td>
                    <td className="text-center">{statuses[index]}</td>
                </tr>
            ))}
        </>
    );
}
