import { FC } from "react";
import { DroppableList } from "@src/shared/components/common";
import { Todo } from "@src/shared/types";
import { TodoDroppableId } from "../../types";
import styles from "./styles.module.scss";

interface TodoListProps {
    title?: string;
    data: Todo[];
    droppableId: TodoDroppableId;
}

export const TodoList: FC<TodoListProps> = ({ title, data, droppableId }) => {
    return (
        <div className={styles.container}>
            {title && <h2>{title}</h2>}
            <DroppableList droppableId={droppableId} data={data} />
        </div>
    );
};
