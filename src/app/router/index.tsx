import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { AppLayout } from "../components/AppLayout";
import { todoPageRouter } from "@src/pages/Todo";

export const appRouter = () => {
    const routes: RouteObject[] = [...todoPageRouter()];
    return createBrowserRouter([
        {
            path: "/",
            errorElement: <NotFoundPage />,
            element: <AppLayout />,
            children: routes,
        },
    ]);
};
