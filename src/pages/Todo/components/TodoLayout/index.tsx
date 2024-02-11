import { FC } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { uniqueId } from "lodash";
import { Button } from "@mui/material";
import {
    useCreateTodo,
    useGetCompleteTodoList,
    useGetTodoList,
    useUpdateBothList,
    useUpdateCompleteTodoList,
    useUpdateTodoList,
} from "../../service";
import { TodoList } from "../TodoList";
import { TODO_DROPPABLE_ID } from "../../constants";
import styles from "./styles.module.scss";

export const TodoLayout: FC = () => {
    const todoList = useGetTodoList();
    const completeTodoList = useGetCompleteTodoList();
    const createTodoMutation = useCreateTodo();
    const updateTodoListMutation = useUpdateTodoList();
    const updateBothListMutation = useUpdateBothList();
    const updateCompleteListMutation = useUpdateCompleteTodoList();

    const handleCreateTodo = (todo: string) => {
        createTodoMutation.mutate({
            id: uniqueId(),
            title: todo,
        });
    };

    if (!todoList.isSuccess || !completeTodoList.isSuccess) return null;

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;
        const start =
            source.droppableId === "list"
                ? [...todoList.data]
                : [...completeTodoList.data];
        const finish =
            destination.droppableId === "completeList"
                ? [...completeTodoList.data]
                : [...todoList.data];
        const [removed] = start.splice(source.index, 1);
        if (source.droppableId === destination.droppableId) {
            start.splice(destination.index, 0, removed);
            return source.droppableId === "list"
                ? updateTodoListMutation.mutate(start)
                : updateCompleteListMutation.mutate(start);
        }
        finish.splice(destination.index, 0, removed);
        return updateBothListMutation.mutate({
            list: source.droppableId === "list" ? start : finish,
            completeList:
                destination.droppableId === "completeList" ? finish : start,
        });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.container}>
                <Button
                    variant='contained'
                    sx={{
                        width: 150,
                    }}
                >
                    Добавить
                </Button>
                <div className={styles.list}>
                    <TodoList
                        data={todoList.data}
                        title='Список дел'
                        droppableId={TODO_DROPPABLE_ID.list}
                    />
                    <TodoList
                        data={completeTodoList.data}
                        title='Список завершенных дел'
                        droppableId={TODO_DROPPABLE_ID.completeList}
                    />
                </div>
            </div>
        </DragDropContext>
    );
};
