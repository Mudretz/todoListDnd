import { FC } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

export const Loader: FC = () => {
    return (
        <div className={styles.container}>
            <CircularProgress />
        </div>
    );
};
