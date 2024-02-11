import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "./todo.service";
import { Todo } from "@src/shared/types";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo) => todoService.createTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useUpdateTodoList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo[]) => todoService.updateTodoList(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useUpdateCompleteTodoList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo[]) => todoService.updateCompleteTodoList(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["completeTodo"] });
        },
    });
};

export const useUpdateBothList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Record<string, Todo[]>) =>
            todoService.updateBothList(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
            queryClient.invalidateQueries({ queryKey: ["completeTodo"] });
        },
    });
};
