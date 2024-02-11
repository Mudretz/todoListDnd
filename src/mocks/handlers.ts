import { uniqueId } from "lodash";
import { HttpResponse, http } from "msw";

let mockData = [
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

const updateTodoListHandler = http.put("/api/todo", async ({ request }) => {
    const todoList = await request.json();
    mockData = todoList as {
        id: string;
        title: string;
    }[];
    console.log(todoList);
    return HttpResponse.json(
        {
            message: "ok",
        },
        { status: 200 },
    );
});

const createTodoHandler = http.post("/api/todo", async ({ request }) => {
    const newTodo = await request.json();
    mockData.push(
        newTodo as {
            id: string;
            title: string;
        },
    );
    return HttpResponse.json(
        {
            message: "ok",
        },
        { status: 201 },
    );
});

export const handlers = [todoHandler, createTodoHandler, updateTodoListHandler];
