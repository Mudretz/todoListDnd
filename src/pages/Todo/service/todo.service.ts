import { axiosInstance } from "@src/shared/api/config";
import { Todo } from "@src/shared/types";
import { TodoDroppableId } from "../types";

export const todoService = {
    getTodoList: async (): Promise<Todo[]> => {
        const response = await axiosInstance.get("/todo/all");
        return response.data;
    },
    createTodo: async (data: Todo): Promise<void> => {
        await axiosInstance.post("/todo/create", data);
    },
    updateTodoList: async (data: Todo[]): Promise<void> => {
        await axiosInstance.put("/todo/update", data);
    },
    getCompleteTodoList: async (): Promise<Todo[]> => {
        const response = await axiosInstance.get("/completeTodo/all");
        return response.data;
    },
    updateCompleteTodoList: async (data: Todo[]): Promise<void> => {
        await axiosInstance.put("/completeTodo/update", data);
    },
    updateBothList: async (
        data: Record<TodoDroppableId, Todo[]>,
    ): Promise<void> => {
        await axiosInstance.put("/todoAll/update", data);
    },
};
