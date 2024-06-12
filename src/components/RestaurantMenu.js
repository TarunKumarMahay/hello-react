import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = ()=> {
    const MENU_URL = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6234157&lng=77.297958&restaurantId=";
    const{ resId } = useParams();
    console.log("restaurant id: ", resId);

    const [resInfo, setResInfo] = useState(null);
    //if index is 0, 1st category is open and so on.
    const[showIndex, setShowIndex] = useState(null);
    //const resInfo = await useRestaurantMenu(resId);
    //console.log(resInfo);
    useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async ()=>{
        const data = await fetch(MENU_URL + resId);
        const json = await data.json();
        setResInfo(json.data);
    };

    if(!resInfo) return <Shimmer />;

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;//resInfo?.data?.cards[2]?.card?.card?.info;
    
    console.log(name + " " + cuisines + " " + costForTwoMessage);
    //resInfo?.cards[2]?.card.card.info;
    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;
    console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    //To filter out all the food items category wise.
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(c=> c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");
    console.log(categories);

    return(
        <div className="text-center">
            <h1 className="font-bold my-8 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
            {cuisines.join(', ')} - {costForTwoMessage}</p>         
            {/*categories accordions*/}
            {categories.map((category, index) => (
                <RestaurantCategory key = {category?.card?.card?.title} data={category?.card?.card}
                    showItems = {index === showIndex ? true : false}
                    setShowIndex = {() => {setShowIndex(index);}}
                />
            )
            )};
        </div>
    );
};

export default RestaurantMenu;