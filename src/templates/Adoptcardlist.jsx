import Adoptcard from "./Adoptcard";

export default function Shop(props) {
    return (
        <div className=" flex justify-start flex-wrap gap-x-4 gap-y-7 " >
            {props.adoptData.map((item) => {
                return (
                    <Adoptcard

                        name={item.name}
                        img={item.img}
                    />
                );
            })}
        </div>
    );
}
