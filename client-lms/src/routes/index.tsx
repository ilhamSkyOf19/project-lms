import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Pricing from "../Pages/Pricing";
import SuccessCheckout from "../Pages/SuccessCheckout";
import NotFound from "../Pages/NotFound";
import LayoutDashboard from "../Layouts/LayoutDashboard";
import ManagerOverview from "../Pages/managers/ManagerOverview";
import ManagerCourse from "../Pages/managers/course/ManagerCourse";
import NewCourse from "../Pages/managers/course/NewCourse";
import ManageCourseMateri from "../Pages/managers/course/ManageCourseMateri";
import AddContentCourse from "../Pages/managers/course/AddContentCourse";
import ManagerStudents from "../Pages/managers/student/ManagerStudents";
import AddStudent from "../Pages/managers/student/AddStudent";

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
                element: <ManagerOverview />,
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
            },
            {
                path: "/manager/students/add-student",
                element: <AddStudent />,
            }

        ]
    },
]);


export default route;
