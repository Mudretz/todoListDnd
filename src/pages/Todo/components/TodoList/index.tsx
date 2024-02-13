import { FC } from "react";
import { Todo } from "@src/shared/types";
import { TodoDroppableId } from "../../types";
import { DraggableListTodo } from "../DraggableListTodo";
import styles from "./styles.module.scss";

interface TodoListProps {
    title?: string;
    data: Todo[];
    droppableId: TodoDroppableId;
    onDelete: (id: string, type: string) => void;
}

export const TodoList: FC<TodoListProps> = ({
    title,
    data,
    droppableId,
    onDelete,
}) => {
    return (
        <div className={styles.container}>
            {title && <h2>{title}</h2>}
            <DraggableListTodo
                droppableId={droppableId}
                data={data}
                onDelete={onDelete}
            />
        </div>
    );
};
