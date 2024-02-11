import { FC } from "react";
import { Button, Card, Container, Paper } from "@mui/material";
import { useCreateTodo, useGetTodoList, useUpdateTodoList } from "./service";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";

export const Todo: FC = () => {
    const { data, isFetching, isSuccess } = useGetTodoList();
    const createTodoMutation = useCreateTodo();
    const updateTodoList = useUpdateTodoList();

    const handleCreateTodo = () => {
        createTodoMutation.mutate({
            id: "asdasd",
            title: "Тест",
        });
    };

    if (isFetching) return null;

    if (!isSuccess) return null;

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;
        const start = [...data];
        const finish = [];

        if (source.droppableId === destination.droppableId) {
            const starState = [...start];
            const [removed] = starState.splice(source.index, 1);
            starState.splice(destination.index, 0, removed);
            return updateTodoList.mutate(starState);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button onClick={handleCreateTodo}>Добавить</Button>
                <Droppable droppableId='active'>
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
                                            {item.title}{" "}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {provider.placeholder}
                        </Paper>
                    )}
                </Droppable>
                {/* <Droppable droppableId='complete'>
                    {(provider) => (
                        <Paper
                            ref={provider.innerRef}
                            {...provider.droppableProps}
                            sx={{
                                height: 500,
                                width: 300,
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
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
                                            {item.title}{" "}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                        </Paper>
                    )}
                </Droppable> */}
            </Container>
        </DragDropContext>
    );
};
