
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Blog from "../components/Blog";
import About from "../components/About";
import Contact from "../components/Contact";
import SinglePost from "../components/SinglePost";
import Login from "../components/Login";
import Register from "../components/Register";
import Dashboard from "../components/Dashboard";
import Layout from "../components/Layout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/blog",
                element: <Blog />
            },
            {
                path: "/blog/:id",
                element: <SinglePost />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);

export default router;
