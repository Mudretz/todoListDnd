import { FC, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { uniqueId } from "lodash";
import {
    useCreateTodoMutation,
    useDeleteCompleteTodoMutation,
    useDeleteTodoMutation,
    useGetCompleteTodoList,
    useGetTodoList,
    useUpdateBothListMutation,
    useUpdateCompleteTodoListMutation,
    useUpdateTodoListMutation,
} from "../../service";
import { TodoList } from "../TodoList";
import { TODO_DROPPABLE_ID } from "../../constants";
import { FormCreateTodo } from "../FormCreateTodo";
import { ErrorPage, Loader } from "@src/shared/components/ui";
import { Todo } from "@src/shared/types";
import styles from "./styles.module.scss";

export const TodoLayout: FC = () => {
    const todoList = useGetTodoList();
    const completeTodoList = useGetCompleteTodoList();
    const createTodo = useCreateTodoMutation();
    const updateTodoList = useUpdateTodoListMutation();
    const updateBothList = useUpdateBothListMutation();
    const updateCompleteList = useUpdateCompleteTodoListMutation();
    const deleteTodo = useDeleteTodoMutation();
    const deleteCompleteTodo = useDeleteCompleteTodoMutation();
    const [stateTodo, setStateTodo] = useState<Record<string, Todo[]>>({
        list: [],
        completeList: [],
    });
    useEffect(() => {
        if (todoList.data && completeTodoList.data) {
            setStateTodo({
                list: todoList.data,
                completeList: completeTodoList.data,
            });
        }
    }, [todoList.isFetching, completeTodoList.isFetching]);

    const handleCreateTodo = (todo: string) => {
        createTodo.mutate({
            id: uniqueId(),
            title: todo,
        });
    };

    const handleDeleteTodo = (id: string, type: string) => {
        switch (type) {
            case "list":
                deleteTodo.mutate({ id: id });
                break;
            case "completeList":
                deleteCompleteTodo.mutate({ id: id });
                break;
        }
    };

    if (todoList.isPending || completeTodoList.isPending) return <Loader />;
    if (!todoList.isSuccess || !completeTodoList.isSuccess)
        return <ErrorPage />;

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;
        const start = stateTodo[source.droppableId];
        const finish = stateTodo[destination.droppableId];
        const [removed] = start.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            start.splice(destination.index, 0, removed);
            setStateTodo((s) => ({
                ...s,
                [source.droppableId]: start,
            }));
            return source.droppableId === "list"
                ? updateTodoList.mutate(start)
                : updateCompleteList.mutate(start);
        }
        finish.splice(destination.index, 0, removed);
        setStateTodo((prevState) => {
            const newState = { ...prevState };
            newState[source.droppableId] = start;
            newState[destination.droppableId] = finish;
            return newState;
        });
        return updateBothList.mutate({
            list: source.droppableId === "list" ? start : finish,
            completeList:
                destination.droppableId === "completeList" ? finish : start,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.container}>
                <FormCreateTodo onCreateTodo={handleCreateTodo} />
                <div className={styles.list}>
                    <TodoList
                        data={stateTodo.list}
                        title='Список дел'
                        droppableId={TODO_DROPPABLE_ID.list}
                        onDelete={handleDeleteTodo}
                    />
                    <TodoList
                        data={stateTodo.completeList}
                        title='Список завершенных дел'
                        droppableId={TODO_DROPPABLE_ID.completeList}
                        onDelete={handleDeleteTodo}
                    />
                </div>
            </div>
        </DragDropContext>
    );
};
