import { Todo } from "./todo.types";
import { axiosInstance } from "@src/shared/api/config";

export const todoService = {
    getTodoList: async (): Promise<Todo[]> => {
        const response = await axiosInstance.get("/todo");
        return response.data;
    },
    createTodo: async (data: Todo): Promise<void> => {
        await axiosInstance.post("/todo", data);
    },
    updateTodoList: async (data: Todo[]): Promise<void> => {
        await axiosInstance.put("/todo", data);
    },
};
