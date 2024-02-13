export type TodoDroppableId = "list" | "completeList";

export interface DndTodoProps {
    droppableId: TodoDroppableId;
    onDelete: (id: string, droppableId: string) => void;
}
