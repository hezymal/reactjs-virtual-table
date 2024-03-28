import { FC, ReactNode } from "react";
import styles from "./head-cell.module.scss";

interface HeadCellProps {
    children: ReactNode;
    width: number;
}

export const HeadCell: FC<HeadCellProps> = ({ children, width }) => {
    return (
        <div className={styles.HeadCell} style={{ width: width + "px" }}>
            {children}
        </div>
    );
};
