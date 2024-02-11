import { createBrowserRouter, RouteObject } from "react-router-dom";
import { NotFoundPage } from "../components/NotFoundPage";
import { Todo } from "@src/pages/Todo";

export const appRouter = () => {
    const routes: RouteObject[] = [];
    return createBrowserRouter([
        {
            path: "/",
            errorElement: <NotFoundPage />,
            element: <Todo />,
            children: routes,
        },
    ]);
};
