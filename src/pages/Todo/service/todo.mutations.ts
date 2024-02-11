import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "./todo.service";
import { Todo } from "./todo.types";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo) => todoService.createTodo(data),
        mutationKey: ["todo"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useUpdateTodoList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo[]) => todoService.updateTodoList(data),
        mutationKey: ["todo"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};
