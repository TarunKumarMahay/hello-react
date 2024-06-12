import React, { Suspense, lazy, useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import Body_alternate from "./components/Body_alternate";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
//On demand loading //lazy loading of the component when required

const Grocery = lazy(() => import('./components/Grocery'));
const AppLayout = () => {

    const [userName, setUserName] = useState();

    //authentication
    useEffect(() => {
        //Make an API call sending in username and password
        const data = {
            name : "Tarun Kumar Mahay",
        };
        setUserName(data.name);
    }, []);
    return(
        <Provider store={appStore}>
            <UserContext.Provider value = {{loggedInUser : userName, setUserName}}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
        
    )
};

const appRouter = createBrowserRouter([
    {
        path : "/" ,
        element : <AppLayout />,
        
        children : [
            {
                path : "/" ,
                element : <Body_alternate />,
            },
            {
                path : "/about",
                element : <About />,
            },
            {
                path : "/contact",
                element : <Contact />,
            },
            {
                path : "/grocery",
                element : <Suspense fallback={<h1>Loading..</h1>}>
                            <Grocery />
                        </Suspense>,
            },
            {
                path : '/restaurants/:resId',
                element : <RestaurantMenu />,
            },
            {
                path : '/cart',
                element : <Cart />,
            }
        ],
        errorElement : <Error />,  
    }, 
     
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter} />); 