import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
const Body_alternate = () => {

    //superPowerfull local state variable
    const [listOfResturants, setListOfResturants] = useState([]);
    const [filteredResturants , setFilteredResturants] = useState([])
    const [searchText, setSearchText] = useState("");
    
    useEffect(() => { fetchData() }, []);
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6234157&lng=77.297958&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
       
        setListOfResturants(/*json?.data?.cards[2]?.data?.data?.cards)*/json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredResturants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);    
    };

    const onlineStatus = useOnlineStatus();
    if(onlineStatus === false)
        return(
        <h1>Looks like your internet is down.</h1>
    );
    //console.log("restaurants list: ", listOfResturants);
    if (listOfResturants.length === 0) {
        return (<Shimmer />)
    }

    console.log("filteredRestaurant: ", filteredResturants);

    return (
        <div className="body">

            <div className="filter flex ">
                <div className="search p-4 m-4 ">
                    <div className="">
                        <input className=" border-solid border-black  border-2 rounded-lg p-2 my-6 mx-6" type="text" placeholder="search for resturants "
                            value={searchText} onChange={(e) => {
                                setSearchText(e.target.value);
                            }} 
                            />
                      <button className="shadow-sm shadow-black px-6 py-1 rounded-lg text-base " 
                            onClick={()=>{
                        const searchList = listOfResturants.filter((res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        setFilteredResturants(searchList);                   
                       
                      }}>search

                      </button>
                       
                    </div>
                </div>
                <div className="flex items-center" >
                <button className="ml-20 border-2 w-60 rounded-lg bg-slate-100 py-2   " onClick={() => {
                    debugger    
                    let filteredList = listOfResturants.filter(res =>
                        res.info.avgRating > 4
                    )
                    setFilteredResturants(filteredList);
                }}
                >Top Rated Resturants</button>
                </div>

            </div>
           
            <div className="flex flex-wrap">
                {filteredResturants.map((restaurant) => (<Link 
                key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>                    
                    <RestaurantCard resData={restaurant} />
                    </Link>))}
            </div>
        </div>
    );
};
export default Body_alternate;