import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "./todo.service";
import { Todo } from "@src/shared/types";

export const useCreateTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo) => todoService.createTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useUpdateTodoListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo[]) => todoService.updateTodoList(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useUpdateCompleteTodoListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Todo[]) => todoService.updateCompleteTodoList(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["completeTodo"] });
        },
    });
};

export const useUpdateBothListMutation = () => {
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

export const useDeleteTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string }) => todoService.deleteTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
};

export const useDeleteCompleteTodoMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { id: string }) =>
            todoService.deleteCompleteTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["completeTodo"] });
        },
    });
};
