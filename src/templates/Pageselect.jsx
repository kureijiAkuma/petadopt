import pawright from "../icons/paw-right.svg"
import pawleft from "../icons/paw-left.svg"

export default function Pageselect() {
    return (

        <nav className="w-fit h-fit p-1 flex bg-pink-100/50 rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <img className="w-96" src={pawleft} alt="" />
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <h1>1</h1>
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <h1>2</h1>
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <h1>3</h1>
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <h1>4</h1>
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <h1>5</h1>
            </button>

            <button className="mx-1 flex justify-center items-center size-9 p-1.5 bg-white rounded-full border-solid border border-gray-400 shadow-md shadow-black/50">
                <img className="w-96" src={pawright} alt="" />
            </button>

        </nav>

    )
}