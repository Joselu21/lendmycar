import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import AppWrapper from "../layouts/AppWrapper";
import Search from "../pages/Search/Search";
import Publish from "../pages/Publish/Publish";
import Offer from "../pages/Offer/Offer";

const router = createBrowserRouter([
    {
        element: <AppWrapper/>,
        children: [
            {
                path: "/",
                element: <Search/>
            },
            {
                path: "/search",
                element: <Search/>
            },
            {	
                path: "/search/share",
                element: <Search/>
            },
            {
                path: "/search/rent",
                element: <Search/>
            },
            {
                path: "/search/rent/:id",
                element: <Offer/>
            },
            {
                path: "/search/share/:id",
                element: <Offer/>
            },
            {
                path: "/publish",
                element: <Publish/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/profile/:id",
                element: <Profile/>
            },
        ]
    }
]);

export default router;