import { FC, useState } from "react";
import { Todo } from "@src/shared/types";
import { TodoDroppableId } from "../../types";
import { isValidString } from "@src/shared/utils";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./styles.module.scss";
import { ButtonWithIcon } from "@src/shared/components/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../../service/todo.service";
import { TEXT_MESSAGES } from "@src/shared/constants";

interface FormEditTodoProps {
    item: Todo;
    droppableId: TodoDroppableId;
    onHide: () => void;
}

export const FormEditTodo: FC<FormEditTodoProps> = ({
    item,
    droppableId,
    onHide,
}) => {
    const [value, setValue] = useState(item.title);
    const [error, setError] = useState("");
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data: Todo) => {
            if (droppableId === "list") {
                return todoService.updateTodo(data);
            } else {
                return todoService.updateCompleteTodo(data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [droppableId === "list" ? "todo" : "completeTodo"],
            });
            onHide();
        },
        onError: () => {
            setError(TEXT_MESSAGES.errorNetwork);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError("");
        setValue(e.currentTarget.value);
    };

    const onSubmit = () => {
        if (!isValidString(value)) {
            setError("Заполните поле");
            return;
        }
        if (value !== item.title) {
            mutate({
                id: item.id,
                title: value,
            });
            return;
        }
        onHide();
    };

    return (
        <div className={styles.form}>
            <TextField value={value} onChange={handleChange} error={!!error} />
            <div className={styles.buttonGroup}>
                <ButtonWithIcon onClick={onHide}>
                    <CloseIcon />
                </ButtonWithIcon>
                <ButtonWithIcon onClick={onSubmit}>
                    <DoneIcon />
                </ButtonWithIcon>
            </div>
        </div>
    );
};
