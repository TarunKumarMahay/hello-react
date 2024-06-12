import UserContext from "../utils/UserContext";
import UserClass from "./UserClass";
import { useContext } from "react";

const About = ()=> {
    //const {loggedInUser} = useContext(UserContext);
    return (
        <div>
            <h1 className="font-bold px-4 py-2">About</h1>
            <h2 className = "px-4">Hello this is beginners tutorial in React</h2>
            <UserClass name = {"Tarun Kumar Mahay classes"}/>
        </div>
    );
};

export default About;