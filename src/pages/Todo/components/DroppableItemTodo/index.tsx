import { FC, useState } from "react";
import { DndTodoProps } from "../../types";
import { FormEditTodo } from "../FormEditTodo";
import { Todo } from "@src/shared/types";
import { ButtonWithIcon } from "@src/shared/components/ui";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.scss";

interface DroppableItemProps extends DndTodoProps {
    item: Todo;
}

export const DroppableItemTodo: FC<DroppableItemProps> = ({
    item,
    droppableId,
    onDelete,
}) => {
    const [edit, setEdit] = useState(false);

    const handleHideEdit = () => {
        setEdit(!edit);
    };
    return (
        <>
            {edit ? (
                <FormEditTodo
                    item={item}
                    droppableId={droppableId}
                    onHide={handleHideEdit}
                />
            ) : (
                <div>{item.title}</div>
            )}
            {!edit && (
                <div className={styles.buttonGroup}>
                    <ButtonWithIcon onClick={handleHideEdit}>
                        <CreateIcon />
                    </ButtonWithIcon>
                    {onDelete && (
                        <ButtonWithIcon
                            onClick={() => onDelete(item.id, droppableId)}
                        >
                            <DeleteIcon />
                        </ButtonWithIcon>
                    )}
                </div>
            )}
        </>
    );
};
