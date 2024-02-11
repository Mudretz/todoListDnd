import { RouteObject } from "react-router-dom";
import { TodoLayout } from "../components/TodoLayout";

export const todoPageRouter = (): RouteObject[] => {
    return [
        {
            path: "",
            element: <TodoLayout />,
        },
    ];
};
