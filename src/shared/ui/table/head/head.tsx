import { ReactNode, forwardRef } from "react";
import styles from "./head.module.scss";

interface HeadProps {
    children: ReactNode;
}

export const Head = forwardRef<HTMLDivElement, HeadProps>(
    ({ children }, ref) => {
        return (
            <div className={styles.Head} ref={ref}>
                {children}
            </div>
        );
    }
);
