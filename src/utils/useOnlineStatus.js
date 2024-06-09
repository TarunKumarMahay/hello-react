import { useEffect, useState} from "react";

const useOnlineStatus = ()=> {
    //state variable
    const [onlineStatus, setOnlineStatus] = useState(true);
        useEffect(() => {
        //adding event listener
        window.addEventListener("online", ()=>{
            setOnlineStatus(true);
        });
        window.addEventListener("offline", ()=> {
            setOnlineStatus(false);
        });
    }, []);

    //boolean value
    return onlineStatus;
}

export default useOnlineStatus;