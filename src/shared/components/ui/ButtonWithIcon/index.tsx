import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

interface ButtonWithIconProps extends ButtonProps {}

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
    children,
    ...props
}) => {
    return (
        <Button
            sx={{
                p: 0,
                minWidth: 30,
            }}
            {...props}
        >
            {children}
        </Button>
    );
};
