import Navbar from "../templates/Navbar"
import bag from "../icons/bag.svg"
import heart from "../icons/heart.svg"
import bin from "../icons/bin.svg"
import { useState } from "react"
import AddShop from "../Dashboard/AddShop"
import DelShop from "../Dashboard/DelShop"

export default function Adminsettings() {
    const [activeTab, setActiveTab] = useState('addshop');

    return (
        <div>
            <Navbar />
            <aside id="logo-sidebar" className="shadow-xl shadow-black fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-800 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <div onClick={() => setActiveTab('addshop')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-200/80 group ${activeTab === 'addshop' ? 'bg-red-200' : 'bg-white'}`}>
                                <img className="w-6 h-6" src={bag} alt="Bag icon" />
                                <span className="ms-3">Add Product</span>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => setActiveTab('delshop')} className={`cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-200/80 group ${activeTab === 'delshop' ? 'bg-red-200' : 'bg-white'}`}>
                                <img className="w-6 h-6" src={bin} alt="Heart icon" />
                                <span className="ms-3">Delete Product</span>
                            </div>
                        </li>
                        {/* Add other tabs here */}
                    </ul>
                </div>
            </aside>

            {/* Content */}
            <div className={`flex justify-center sm:ml-64 ${activeTab === 'addshop' ? "bg-red-200": "bg-white" }`}>
                {activeTab === 'addshop' && <AddShop />}
                {activeTab === 'delshop' && <DelShop />}
                {/* Add other tab content here */}
            </div>
        </div>
    )
}
