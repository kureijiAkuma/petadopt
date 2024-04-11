import dog from "../images/dog_placeholder.png"
import { useNavigate } from "react-router-dom"

export default function AdoptCard(props){
    const history = useNavigate()
    const handleClick = () => {
            history("/adopt_2");
    }

    return(
        <button onClick={handleClick} className="flex flex-col justify-center items-center relative ml-4 w-52 h-48 rounded-md bg-purple-50 shadow-md shadow-black/50 border-solid border border-pink-100/70 hover:bg-red-100 active:bg-red-200">
            <img className=" size-11/12  rounded-md border-solid border border-pink-100/50" src={`./src/images/${props.img}`} alt="" />
            <div className=" flex justify-center items-center gap-x-1 absolute self-center -bottom-4 w-3/4 h-9 bg-purple-50 rounded-md border-solid border border-pink-100/70 shadow-md shadow-black/50 hover:bg-red-100 active:bg-red-200">
                <h1 className="w-full ">{props.name}</h1>
            </div>
        </button>
    )
}