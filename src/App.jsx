import React from "react";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import {
    Link,
    NavLink,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/about",
            element: <div>About</div>,
        },
        {
            path: "/tools",
            element: <div>Tools</div>,
        },
    ]);
    return (
        <div className="w-full max-w-[100%] overflow-x-hidden h-full min-h-screen bg-[#0E6D47]">
            <RouterProvider router={router} />
            <Footer />
        </div>
    );
}

export default App;
