import { Todo } from "@src/shared/types";
import { uniqueId } from "lodash";
import { HttpResponse, http } from "msw";

let activeTodoList: Todo[] = [
    {
        id: uniqueId(),
        title: "Получение приглашение на собеседование",
    },
];

let completeTodoList: Todo[] = [
    {
        id: uniqueId(),
        title: "Сделать тестовое задание",
    },
];

const todoHandler = http.get("/api/todo/all", () => {
    return HttpResponse.json(activeTodoList);
});

const todoCompleteHandler = http.get("/api/completeTodo/all", () => {
    return HttpResponse.json(completeTodoList);
});

const createTodoHandler = http.post("/api/todo/create", async ({ request }) => {
    const body = await request.json();
    activeTodoList.push(body as Todo);
    return HttpResponse.json(
        {
            message: "ok",
        },
        { status: 201 },
    );
});

const updateTodoListHandler = http.put(
    "/api/todo/update",
    async ({ request }) => {
        const body = await request.json();
        activeTodoList = body as Todo[];
        return HttpResponse.json(
            {
                message: "ok",
            },
            { status: 200 },
        );
    },
);

const updateCompleteTodoListHandler = http.put(
    "/api/completeTodo/update",
    async ({ request }) => {
        const body = await request.json();
        completeTodoList = body as Todo[];
        return HttpResponse.json(
            {
                message: "ok",
            },
            { status: 200 },
        );
    },
);

const updateBothListTodoHandler = http.put(
    "/api/todoAll/update",
    async ({ request }) => {
        const body = (await request.json()) as {
            list: Todo[];
            completeList: Todo[];
        };
        activeTodoList = body.list;
        completeTodoList = body.completeList;
        return HttpResponse.json(
            {
                message: "ok",
            },
            { status: 200 },
        );
    },
);

const deleteTodoHandlers = http.delete(
    "/api/todo/delete/:todoId",
    async ({ params }) => {
        const { todoId } = params;
        activeTodoList = activeTodoList.filter((item) => item.id !== todoId);
        return HttpResponse.json(
            {
                message: "ok",
            },
            { status: 200 },
        );
    },
);

const deleteCompleteTodoHandlers = http.delete(
    "/api/completeTodo/delete/:todoId",
    async ({ params }) => {
        const { todoId } = params;
        console.log(todoId);
        completeTodoList = completeTodoList.filter(
            (item) => item.id !== todoId,
        );
        return HttpResponse.json(
            {
                message: "ok",
            },
            { status: 200 },
        );
    },
);

export const handlers = [
    todoHandler,
    todoCompleteHandler,
    createTodoHandler,
    updateTodoListHandler,
    updateCompleteTodoListHandler,
    updateBothListTodoHandler,
    deleteTodoHandlers,
    deleteCompleteTodoHandlers,
];
