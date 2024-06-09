import {useState, useEffect} from "react";
import { MENU_URL } from "./constants";

const useRestaurantMenu = (resId)=>{

    console.log(resId);
    //state variable
    const [resInfo, setResInfo] = useState(null);

    useEffect = (()=>{
        fetchData();
    }, []);

    const fetchData = async ()=>{
        const data = await fetch(MENU_URL + resId );
        const json = await data.json();
        setResInfo(json.data);
    };
    console.log(resInfo);

    return resInfo;
};

export default useRestaurantMenu;