import { FC, PropsWithChildren } from "react";
import { Paper } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

interface DroppableListProps extends PropsWithChildren {
    droppableId: string;
}

export const DroppableList: FC<DroppableListProps> = ({
    droppableId,
    children,
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
                    {children}
                    {provider.placeholder}
                </Paper>
            )}
        </Droppable>
    );
};
