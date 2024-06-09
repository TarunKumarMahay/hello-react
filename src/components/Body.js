import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import {useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    const [listOfRestaurant, setListOfRestaurant] = useState([]);

    const [searchText, setsearchText] = useState("");

    const [filteredRestaurant, setfilteredRestaurant] = useState([]);
 
    const RestaurantCardWithPromotedLabel = withPromotedLabel(RestaurantCard);

    useEffect(() => {
      console.log("fetch data called");
      fetchData();
    }, []);


    const fetchData = async () => {
      const URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6412555&lng=77.29618289999999&collection=83644&tags=layout_CCS_Pizza&sortBy=&filters=&type=rcv2&offset=0&page_type=null";
      const res = await fetch(URL);
      const json = await res.json();

      //console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle.restaurants);
      console.log("Body rendered" + filteredRestaurant);
      setListOfRestaurant(json?.data?.cards);
      setfilteredRestaurant(json?.data?.cards);
    };

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false)
        return(
        <h1>Looks like your internet is down.</h1>
    );
    
    return listOfRestaurant.length === 0 ? (<Shimmer />) : 
        (<div className="body">
            <div className="filter-button flex ">
                <div className="search p-4 m-4">
                    <input type="text" className="border border-solid border-black" value={searchText}
                        onChange={(e) => {setsearchText(e.target.value);}} 
                    />
                    <button className="px-4 py-2 m-4 bg-orange-400 rounded-lg" onClick={()=>
                    {
                        //Filter restaurants by the searched keyword
                        const restaurantNames = listOfRestaurant.filter(item => (Object.keys(item.card.card).includes("info")));
                        const filteredList = restaurantNames.filter((res) => 
                            res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setListOfRestaurant(filteredList);
                        console.log(searchText);
                    }} 
                    >Search</button>
                </div>
                {console.log(filteredRestaurant)}
                <div className = "search p-4 m-4 rounded-xl items-center">
                    <button className="border border-solid border-black rounded-lg" onClick={() => {
                        const filteredList = filteredRestaurant.filter(
                            res => (res.card.card.info.avgRating > 4.1)
                        );
                        setfilteredRestaurant(filteredList);
                        }}>Top Rated Restaurants
                    </button>
                </div>       
            </div>
            <div className="flex flex-wrap">
                {filteredRestaurant && filteredRestaurant.length > 0 && filteredRestaurant.filter(item => (Object.keys(item.card.card).includes("info"))).map((restaurant) => (
                  <Link 
                        key={restaurant.card.card.info.id}
                        to = {"/restaurants/" + restaurant.card.card.info.id}
                   >                                             
                   <RestaurantCard resData={restaurant} />      
                   </Link>
                ))}
            </div>
        </div>
    )
};

export default Body;