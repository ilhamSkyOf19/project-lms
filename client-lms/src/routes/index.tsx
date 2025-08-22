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
import NotFound from "../Pages/NotFound";
import NewCourse from "../Pages/NewCourse";
import ManageCourseMateri from "../Pages/ManageCourseMateri";
import AddContentCourse from "../Pages/AddContentCourse";

const route = createBrowserRouter([
    {
        path: "*",
        element: <NotFound />,
    },
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
                path: "/manager/course/new-course",
                element: <NewCourse />,
            },
            {
                path: "/manager/course/manage-course-materi/:id",
                element: <ManageCourseMateri />,
            },
            {
                path: "/manager/course/manage-course-materi/:id/add-content",
                element: <AddContentCourse />,
            },
            {
                path: "/manager/students",
                element: <ManagerStudents />,
            }

        ]
    },
]);


export default route;
