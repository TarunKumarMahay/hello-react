import ItemList from "./ItemList";
import { useState } from "react";
const RestaurantCategory = ({data, showItems, setShowIndex}) => {
    //state variable to check whether to show the items or not for a food category.
    //const [showItems, setShowItems] = useState(false);
    const handleClick = ()=>{
        console.log("Clicked");
        setShowIndex();        
    };
    return (
        <div>
            {/*Header*/}
            <div className="bg-gray-50 shadow-lg p-4 w-6/12 mx-auto my-4 ">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold">{data.title}({data.itemCards.length})</span>
                    <span>⬇️</span>                    
                </div>
                {/*Accordion body*/}
                {showItems && <ItemList items = {data.itemCards} />}
            </div>
            
            
        </div>
    );
};

export default RestaurantCategory;