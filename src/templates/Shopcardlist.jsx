import Shopcard from "./Shopcard";

export default function Shop(props) {
    return (
        <div className="flex justify-start flex-wrap gap-x-4 gap-y-7">
            {props.shopData.map((item) => { 
                return (
                    <Shopcard
                        key={item.id}
                        img={item.img}
                        name={item.name}
                        price={item.price}
                    />
                );
            })}
        </div>
    );
}
