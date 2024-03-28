import { ReactNode, forwardRef } from "react";
import styles from "./body.module.scss";

interface BodyProps {
    children: ReactNode;
}

export const Body = forwardRef<HTMLDivElement, BodyProps>(
    ({ children }, ref) => {
        return (
            <div className={styles.Body} ref={ref}>
                {children}
            </div>
        );
    }
);
