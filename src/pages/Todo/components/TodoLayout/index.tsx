import { FC } from "react";
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
import styles from "./styles.module.scss";

export const TodoLayout: FC = () => {
    const todoList = useGetTodoList();
    const createTodo = useCreateTodoMutation();
    const completeTodoList = useGetCompleteTodoList();
    const updateTodoList = useUpdateTodoListMutation();
    const updateBothList = useUpdateBothListMutation();
    const updateCompleteList = useUpdateCompleteTodoListMutation();
    const deleteTodo = useDeleteTodoMutation();
    const deleteCompleteTodo = useDeleteCompleteTodoMutation();

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

    if (!todoList.isSuccess || !completeTodoList.isSuccess)
        return <div>Загрузка</div>;

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
                ? updateTodoList.mutate(start)
                : updateCompleteList.mutate(start);
        }
        finish.splice(destination.index, 0, removed);
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
                        data={todoList.data}
                        title='Список дел'
                        droppableId={TODO_DROPPABLE_ID.list}
                        onDelete={handleDeleteTodo}
                    />
                    <TodoList
                        data={completeTodoList.data}
                        title='Список завершенных дел'
                        droppableId={TODO_DROPPABLE_ID.completeList}
                        onDelete={handleDeleteTodo}
                    />
                </div>
            </div>
        </DragDropContext>
    );
};
