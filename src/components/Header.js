import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");
    
    const {loggedInUser} = useContext(UserContext);
    //console.log(data);

    //subscribing to a store using a selector
    const cartItems = useSelector((store) => (store.cart.items));
    
    const onlineStatus = useOnlineStatus();
    return(
        <div className="flex justify-between bg-orange-200 to-orange-200 shadow-xl">
            <div className="logo-container">
                <img className="w-56" 
                    src= {LOGO_URL}
                />
            </div>
            <div className="flex items-center">
                <ul className = "flex p-8 m-8">
                    <li className="px-4">
                        OnlineStatus : {onlineStatus ? "✅" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link to = "/">Home</Link></li>
                    <li className="px-4">
                        <Link to = "/about">About Us </Link>
                    </li>
                    <li className="px-4">
                        <Link to = "/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link to = "/grocery">Grocery Store</Link>
                    </li>
                        <li className="px-4 font-bold text-xl"><Link to = "/cart">Cart - {cartItems.length} Items</Link>
                    </li>
                    <button className="login-btn" onClick={() => 
                    { btnNameReact === "LogIn" ? setbtnNameReact("Log Out") : setbtnNameReact("LogIn") ;}}>
                    {btnNameReact}</button>

                    <li className="px-4 font-bold">{loggedInUser}</li>
                    
                </ul>
            </div>
        </div>
    )
};

export default Header;