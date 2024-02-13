import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "@mui/material";
import { DroppableList } from "@src/shared/components/common";
import { DndTodoProps } from "../../types";
import { Todo } from "@src/shared/types";
import { DroppableItemTodo } from "../DroppableItemTodo";

interface DraggableListTodoProps extends DndTodoProps {
    data: Todo[];
}

export const DraggableListTodo: FC<DraggableListTodoProps> = ({
    droppableId,
    data,
    onDelete,
}) => {
    return (
        <DroppableList droppableId={droppableId}>
            {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provider) => (
                        <Card
                            ref={provider.innerRef}
                            {...provider.dragHandleProps}
                            {...provider.draggableProps}
                            key={item.id}
                            sx={{
                                p: 1,
                                minHeight: 65,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <DroppableItemTodo
                                item={item}
                                droppableId={droppableId}
                                onDelete={onDelete}
                            />
                        </Card>
                    )}
                </Draggable>
            ))}
        </DroppableList>
    );
};
