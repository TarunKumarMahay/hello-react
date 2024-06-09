import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom/client"
import Header from "./components/Header"
import Body_alternate from "./components/Body_alternate";
import About from "./components/About";
import Contact from "./components/Contact";
import RestaurantMenu from "./components/RestaurantMenu";
import RestaurantCard from "./components/RestaurantCard";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

//On demand loading //lazy loading of the component when required

const Grocery = lazy(() => import('./components/Grocery'));
const AppLayout = () => {
    return(
        <div className="app">
            <Header />
            <Outlet />
        </div>
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
                path : "/restaurants/:resId",
                element : <RestaurantMenu />,
            },
        ],
        errorElement : <Error />,  
    }, 
     
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router = {appRouter} />); 