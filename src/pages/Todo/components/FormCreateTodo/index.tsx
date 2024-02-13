import { FC, useState } from "react";
import { Button, Input } from "@mui/material";
import { uniqueId } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@src/shared/types";
import { todoService } from "../../service/todo.service";
import { isValidString } from "@src/shared/utils";
import { TEXT_MESSAGES } from "@src/shared/constants";
import styles from "./styles.module.scss";

export const FormCreateTodo: FC = () => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: Todo) => todoService.createTodo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
            setText("");
        },
        onError: () => {
            setError(TEXT_MESSAGES.errorNetwork);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError("");
        setText(e.currentTarget.value);
    };
    const handleCreateTodo = () => {
        if (!isValidString(text)) {
            return setError(TEXT_MESSAGES.textRequired);
        }
        mutate({
            id: uniqueId(),
            title: text,
        });
    };

    return (
        <div className={styles.container}>
            <Input
                placeholder='Введите текст'
                sx={{
                    width: 300,
                }}
                value={text}
                onChange={handleChange}
            />
            {error && (
                <p
                    style={{
                        color: "red",
                    }}
                >
                    {error}
                </p>
            )}
            <Button
                variant='contained'
                sx={{
                    width: 150,
                }}
                onClick={handleCreateTodo}
            >
                Добавить
            </Button>
        </div>
    );
};
