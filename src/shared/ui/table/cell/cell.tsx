import { FC, ReactNode } from "react";
import styles from "./cell.module.scss";

interface CellProps {
    children: ReactNode;
    width: number;
}

export const Cell: FC<CellProps> = ({ children, width }) => {
    return (
        <div className={styles.Cell} style={{ width: width + "px" }}>
            {children}
        </div>
    );
};
