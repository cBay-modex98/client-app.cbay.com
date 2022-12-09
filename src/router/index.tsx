import { createBrowserRouter, Params, type RouteObject } from "react-router-dom";
import Auth from "~/pages/auth";
import Private from "~/router/Private";
import Public from "~/router/Public";
import Dashboard from "~/pages/dashboard";
import Outer from "~/layouts/outer";
import { Fallback as ErrorPage } from "@/error-boundary";
import { app_join } from "~/utils";

const auth = true;

let routes = [
    {
        path: "/auth",
        name: "Auth",
        element: (
            <Public auth={auth}>
                <Outer>
                    <Auth />
                </Outer>
            </Public>
        ),
    },

    {
        path: "/",
        element: <Private auth={auth} />,
        errorElement: <ErrorPage message={"404 Page Not Found"} />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                name: "Dashboard",
            },

            {
                path: "profile",
                element: <h1>Profile</h1>,
                name: "Profile",
            },

            {
                path: "settings",
                element: <h1>Settings</h1>,
                name: "Settings",
            },

            {
                path: "orders",
                children: [
                    {
                        index: true,
                        element: <h1>Orders</h1>,
                        name: "Orders",
                    },
                    {
                        path: ":id",
                        element: <h1>Orders id</h1>,
                        name: "Order",
                    },
                    {
                        path: "add",
                        element: <h1>Orders id</h1>,
                        name: "AddOrder",
                    },
                ],
            },

            {
                path: "listings",
                children: [
                    {
                        index: true,
                        element: <h1>Listings</h1>,
                        name: "Listings",
                    },
                    {
                        path: ":id",
                        children: [
                            {
                                index: true,
                                element: <h1>Listing id</h1>,
                                name: "Listing",
                            },
                            {
                                path: "edit",
                                element: <h1>Listing id edit</h1>,
                                name: "EditListing",
                            },
                            {
                                path: "delete",
                                name: "DeleteListing",
                            },
                        ],
                    },
                    {
                        path: "add",
                        element: <h1>Listing id</h1>,
                        name: "AddListing",
                    },
                ],
            },

            {
                path: "help",
                element: <h1>help</h1>,
                name: "Help",
            },

            {
                path: "logout",
                name: "Logout",
            },
        ],
    },
];

export default createBrowserRouter(routes);

interface IRoute {
    name?: string;
    path?: string;
    children?: IRoute[];
}

const _to = (name: string, items: IRoute[]): string[] => {
    for (let route of items) {
        let _path: string[] = [];

        if ("path" in route) {
            _path.push(route.path!);
        }

        if ("name" in route) {
            if (route.name === name) {
                return _path.length ? _path : [""];
            }
        }

        if ("children" in route) {
            const _children_path = _to(name, route.children!);
            if (_children_path.length) return [..._path, ..._children_path];
        }
    }

    return [];
};

export const to = (name: Parameters<typeof _to>[0]) => {
    return app_join(_to(name, routes));
};
