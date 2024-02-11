import { FC, useState } from "react";
import { Button, Input } from "@mui/material";
import styles from "./styles.module.scss";

interface FormCreateTodoProps {
    onCreateTodo: (title: string) => void;
}

export const FormCreateTodo: FC<FormCreateTodoProps> = ({ onCreateTodo }) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError("");
        setText(e.currentTarget.value);
    };

    const handleClick = () => {
        if (text.trim() === "") {
            return setError("Заполните поле");
        }
        onCreateTodo(text);
        setText("");
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
                onClick={handleClick}
            >
                Добавить
            </Button>
        </div>
    );
};
