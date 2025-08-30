import "./index.css";
import React from "react";
import ErrorPage from "./components/errorPage";
// import { Route, Switch, useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLoginForm from "./pages/AdminLoginForm";
import HomeLayout from "./layoutAuth/HomeLayout";
import AdminLayout from "./layoutAuth/AdminLayout";
const LazyAuthLayout = React.lazy(() => import("./layoutAuth/AuthLayout"));
import Dashboard from "./dashboard/components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminViewCourses from "./components/AdminViewCourses";
import AllStudents from "./components/AllStudents";
import Contacts from "./components/Contacts";
import Contractors from "./components/Contractors";
import StudentCommentPage from "./components/StudentCommentPage";
import DashboardCourses from "./dashboard/components/DashboardCourses";

import { AnimatePresence } from "framer-motion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
  },


  
  {
    path: "/admin_LOGIN",
    element: <AdminLoginForm />,
  },

  {
    path: "/ADMIN-DASHBOARD",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "viewcourses",
        element: <AdminViewCourses />,
        children: [
          {
            index: true,
            element: (
              <h1 className="text-center font-bold md:text-4xl">ALL COURSES</h1>
            ),
          },
          {
            path: "published",
            element: (
              <h1 className="text-center font-bold md:text-4xl">PUBLISHED</h1>
            ),
          },
          {
            path: "draft",
            element: (
              <h1 className="text-center font-bold md:text-4xl">DRAFT</h1>
            ),
          },
        ],
      },
      {
        path: "allStudents",
        element: <AllStudents />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "contractors",
        element: <Contractors />,
      },
      {
        // path: "send-links",
        // element: <SendLinks />,
      },
      {
        // path: "send-messages",
        // element: <SendMessages />,
      },
    ],
  },
]);

function App() {
  return (
    // <CartItemProvider>
      <AnimatePresence>
        <RouterProvider router={router} />
      </AnimatePresence>
    // </CartItemProvider>
  );
}

export default App;
