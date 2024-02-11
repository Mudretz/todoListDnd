import { FC } from "react";
import { Card, Paper } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DroppableData } from "@src/shared/types";

interface DroppableListProps {
    droppableId: string;
    data: DroppableData[];
}

export const DroppableList: FC<DroppableListProps> = ({
    droppableId,
    data,
}) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provider) => (
                <Paper
                    sx={{
                        height: 500,
                        width: 300,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                    {...provider.droppableProps}
                    ref={provider.innerRef}
                >
                    {data.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >
                            {(provider) => (
                                <Card
                                    ref={provider.innerRef}
                                    {...provider.dragHandleProps}
                                    {...provider.draggableProps}
                                    key={item.id}
                                    sx={{
                                        p: 1,
                                    }}
                                >
                                    {item.title}
                                </Card>
                            )}
                        </Draggable>
                    ))}
                    {provider.placeholder}
                </Paper>
            )}
        </Droppable>
    );
};
