import { FC } from "react";
import { Button, Card, Paper } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { DroppableData } from "@src/shared/types";
import DeleteIcon from "@mui/icons-material/Delete";

interface DroppableListProps {
    droppableId: string;
    data: DroppableData[];
    onClick: (id: string, droppableId: string) => void;
}

export const DroppableList: FC<DroppableListProps> = ({
    droppableId,
    data,
    onClick,
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
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div>{item.title}</div>
                                    <Button
                                        sx={{
                                            p: 0,
                                            minWidth: 30,
                                        }}
                                        onClick={() =>
                                            onClick(item.id, droppableId)
                                        }
                                    >
                                        <DeleteIcon
                                            sx={{
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Button>
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
