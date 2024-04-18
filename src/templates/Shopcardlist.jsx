import Shopcard from "./Shopcard";

export default function Shopcardlist(props) {
    console.log(props)
    return (
        <div className="flex justify-start flex-wrap gap-x-4 gap-y-7">
            {props.shopData.map((item) => { 
                return (
                    <Shopcard
                        key={item.id}
                        productData={item}
                    />
                );
            })}
        </div>
    );
}
