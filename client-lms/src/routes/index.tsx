import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Pricing from "../Pages/Pricing";
import SuccessCheckout from "../Pages/SuccessCheckout";
import Manager from "../Pages/Manager";
import ManagerCourse from "../Pages/ManagerCourse";
import LayoutDashboard from "../Layouts/LayoutDashboard";
import ManagerStudents from "../Pages/ManagerStudents";

const route = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/manager/sign-in",
        element: <SignIn />,
    },
    {
        path: "/manager/sign-up",
        element: <SignUp />,
    },
    {
        path: "/pricing",
        element: <Pricing />,
    },
    {
        path: "/success-checkout",
        element: <SuccessCheckout />,
    },
    {
        path: "/manager",
        element: <LayoutDashboard />,
        children: [
            {
                index: true,
                element: <Manager />,
            },
            {
                path: "/manager/course",
                element: <ManagerCourse />,
            },
            {
                path: "/manager/students",
                element: <ManagerStudents />,
            }
        ]
    },
]);


export default route;
