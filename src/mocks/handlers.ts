import { uniqueId } from "lodash";
import { HttpResponse, http } from "msw";

const mockData = [
    {
        id: uniqueId(),
        title: "Сделать тестовое задание",
    },
    {
        id: uniqueId(),
        title: "Получение приглашение на собеседование",
    },
];

const todoHandler = http.get("/api/todo", () => {
    return HttpResponse.json(mockData);
});

const createTodoHandler = http.post("/api/todo", async ({ request }) => {
    const newTodo = await request.json();
    mockData.push(
        newTodo as {
            id: string;
            title: string;
        },
    );
    return HttpResponse.json(newTodo, { status: 201 });
});

export const handlers = [todoHandler, createTodoHandler];
