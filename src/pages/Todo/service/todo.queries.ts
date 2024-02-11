import { useQuery } from "@tanstack/react-query";
import { todoService } from "./todo.service";

export const useGetTodoList = () => {
    return useQuery({
        queryKey: ["todo"],
        queryFn: todoService.getTodoList,
    });
};

export const useGetCompleteTodoList = () => {
    return useQuery({
        queryKey: ["completeTodo"],
        queryFn: todoService.getCompleteTodoList,
    });
};
