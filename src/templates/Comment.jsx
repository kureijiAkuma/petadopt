import dog_placeholder from "../images/dog_placeholder.png";
import star_fill from "../icons/star_fill.svg";
import star_half from "../icons/star-half_2.svg";
import star_empty from "../icons/star.svg";

export default function Comment() {
    return (
        <div className="flex flex-col w-full h-fit py-8 px-10 gap-5 bg-red-100 border border-solid border-black shadow-custom">
            <div className="flex gap-5">
                <img className="w-20 h-20 rounded-full " src={dog_placeholder} alt="" />
                <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="font-Roboto font-semibold text-lg">Kitcat2583</h1>
                    <h2 className="font-Roboto font-normal text-sm text-gray-800">18 August 2023</h2>
                    <div className="flex gap-x-1">
                        <img className="w-5 h-5" src={star_fill} alt="" />
                        <img className="w-5 h-5" src={star_fill} alt="" />
                        <img className="w-5 h-5" src={star_fill} alt="" />
                        <img className="w-5 h-5" src={star_fill} alt="" />
                        <img className="w-5 h-5" src={star_empty} alt="" />
                    </div>
                </div>

            </div>


            <h2> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores, dolorum deserunt recusandae dolore, debitis provident laudantium adipisci quaerat quod minus aliquid minima inventore! Excepturi illo tenetur dicta ipsum temporibus.</h2>

        </div>
    )
}