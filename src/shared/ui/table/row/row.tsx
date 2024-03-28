import { FC, ReactNode } from "react";
import styles from "./row.module.scss";

interface RowProps {
    children: ReactNode;
}

export const Row: FC<RowProps> = ({ children }) => {
    return <div className={styles.Row}>{children}</div>;
};
