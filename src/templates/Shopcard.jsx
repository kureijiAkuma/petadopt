import star from "../icons/star.svg"
import { useNavigate } from "react-router-dom"


export default function Shopcard(props) {

    const history=useNavigate();
    const handleClick = ()=>{history("/shop_2")}

    return (
        <button onClick={handleClick} className="flex flex-col justify-start gap-y-2 items-center w-52 h-72 hover:bg-red-100 hover:shadow-md hover:shadow-black/50 active:bg-red-200">
            
            <img className="mt-2 w-11/12 h-44 bg-white shadow-md shadow-black/50 border border-gray-700/50" src={`./src/images/${props.img}`} alt="" />
            
            <div className="flex gap-x-2">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
            </div>

            <h1 className="font-Roboto font-normal text-base">{props.name}</h1>
            <h2 className="font-Roboto text-orange-900 font-normal text-base">₱{props.price}</h2>

        </button>

    )
}