import { useState } from "react"
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai"
import list from "../lists/breeds.json"

export default function () {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex flex-col bg-purple-50 w-1/2 border-solid border-2 border-pink-100/50  rounded-xl text-left shadow-md shadow-black/50">
            <button onClick={() => setIsOpen((prev) => !prev)} className="flex justify-between items-center px-2">
                <h3 className="font-Familjen_Grotesk text-base">Any</h3>
                {isOpen ? (
                    <AiOutlineCaretDown className="h-8"></AiOutlineCaretDown>
                ) : (
                    <AiOutlineCaretUp className="h-8"></AiOutlineCaretUp>
                )
                }
            </button>
            {isOpen &&
                <div className="overflow-y-auto max-h-32 z-50 absolute top-9 flex flex-col w-full bg-purple-50 rounded-md border-solid border-2 border-t-0 border-pink-100/50">
                    {list.map((item, i) => (
                        <div className="py-1 hover:bg-red-100 hover:cursor-pointer">
                            <h3 className="px-2 font-Roboto text-sm">{item.breed}</h3>
                        </div>

                    ))}
                </div>
            }
        </div>
    )
}