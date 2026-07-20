import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.tsx";
import Clients from "./pages/Clients";
import Dashboard from "./pages/Dashboard.tsx";
import ServiceOrders from "./pages/ServiceOrders.tsx"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "clients",
                element: <Clients />
            },
            {
                path: "service-orders",
                element: <ServiceOrders />
            }
        ]
    }
]);