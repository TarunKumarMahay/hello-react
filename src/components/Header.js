import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const [btnNameReact, setbtnNameReact] = useState("Login");

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
                    <li className="px-4">Cart</li>
                    <button className="login-btn" onClick={() => 
                    { btnNameReact === "LogIn" ? setbtnNameReact("Log Out") : setbtnNameReact("LogIn") }}>
                    {btnNameReact}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;