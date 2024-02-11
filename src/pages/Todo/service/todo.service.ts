import { Todo } from "./todo.types";
import { axiosInstance } from "@src/shared/api/config";

export const todoService = {
    getTodoList: async (): Promise<Todo[]> => {
        const response = await axiosInstance.get<Todo[]>("/todo");
        return response.data;
    },
    createTodo: async (data: Todo): Promise<void> => {
        await axiosInstance.post<Todo[]>("/todo", data);
    },
};
