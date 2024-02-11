import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { AppLayout } from "../components/AppLayout";
import { Todo } from "@src/pages/Todo";

export const appRouter = () => {
    const routes: RouteObject[] = [
        {
            path: "",
            element: <Todo />,
        },
    ];
    return createBrowserRouter([
        {
            path: "/",
            errorElement: <NotFoundPage />,
            element: <AppLayout />,
            children: routes,
        },
    ]);
};
