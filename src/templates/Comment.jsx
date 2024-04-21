import dog_placeholder from "../images/dog_placeholder.png";
import star_fill from "../icons/star_fill.svg";
import star_half from "../icons/star-half_2.svg";
import star_empty from "../icons/star.svg";

export default function Comment(props) {
    { console.log("PROPS", props.review.rating) }
    return (

        <div className="flex flex-col w-full h-fit py-8 px-10 gap-5 bg-red-100 border border-solid border-black shadow-custom">
            <div className="flex gap-5">
                <img className="w-20 h-20 rounded-full " src={dog_placeholder} alt="" />
                <div className="flex flex-col justify-center items-start gap-1">
                    <h1 className="font-Roboto font-semibold text-lg">{props.review.username}</h1>
                    <h2 className="font-Roboto font-normal text-sm text-gray-800">{props.review.dateTime}</h2>
                    <div className="flex gap-x-1">
                        {[...Array(5)].map((_, index) => {
                            if (index < Math.floor(props.review.rating)) {
                                return <img key={index} className="w-5 h-5" src={star_fill} alt="" />;
                            } else if (index === Math.floor(props.review.rating) && props.review.rating % 1 !== 0) {
                                return <img key={index} className="w-5 h-5" src={star_half} alt="" />;
                            } else {
                                return <img key={index} className="w-5 h-5" src={star_empty} alt="" />;
                            }
                        })}

                    </div>
                </div>

            </div>


            <h2> {props.review.reviewText}</h2>

        </div >
    )
}