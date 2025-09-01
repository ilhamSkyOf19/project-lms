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
import Preview from "../Pages/Preview";
import Student from "../Pages/Student";
import loaderAuth from "../contexts/loadersAuth";
import loaderCourseDetail from "../contexts/loaderCourseDetail";
import UpdateCourse from "../Pages/managers/course/UpdateCourse";
import loaderCourseAll from "../contexts/loaderCourseAll";
import { loaderCourseContent } from "../contexts/loaderCourseContent";

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
        loader: () => loaderAuth('manager'),
        element: <LayoutDashboard role="manager" />,
        children: [
            {
                index: true,
                loader: () => loaderCourseAll(),
                element: <ManagerOverview />,
            },
            {
                path: "/manager/course",
                loader: () => loaderCourseAll(),
                element: <ManagerCourse />,

            },
            {
                path: "/manager/course/new-course",
                element: <NewCourse />,
            },
            {
                path: "/manager/course/manage-course-materi/:id",
                loader: async ({ params }) => {
                    return loaderCourseDetail(params.id as string)
                },
                element: <ManageCourseMateri />,
            },
            {
                path: "/manager/course/edit-course/:id",
                loader: async ({ params }) => {
                    return loaderCourseDetail(params.id as string)
                },
                element: <UpdateCourse />,
            },
            {
                path: "/manager/course/manage-course-materi/:id/add-content",
                loader: async ({ params }) => {
                    const [courseDetail] = await Promise.all([
                        loaderCourseDetail(params.id as string),
                    ]);

                    return { Course: courseDetail };
                },
                element: <AddContentCourse />,
            },
            {
                path: "/manager/course/manage-course-materi/:id/update-content/:idContent",
                loader: async ({ params }) => {
                    const [courseDetail, courseContent] = await Promise.all([
                        loaderCourseDetail(params.id as string),
                        loaderCourseContent(params.idContent as string)
                    ]);

                    return { Course: courseDetail, CourseContent: courseContent };
                },
                element: <AddContentCourse />,
            },
            {
                path: "/manager/course/manage-course-materi/:id/preview/:idContent",
                element: <Preview />,
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
    {
        path: "/student",
        element: <LayoutDashboard role="student" />,
        children: [
            {
                index: true,
                element: <Student />
            },
            {
                path: '/student/course/:id/preview/:idContent',
                element: <Preview />
            }
        ]
    }
]);


export default route;
