import { FC } from "react";
import { Outlet } from "react-router-dom";

import styles from "./layout.module.scss";

export const Layout: FC = () => {
    return (
        <div className={styles.Layout}>
            <div className={styles["Layout-Header"]}>react-refactoring</div>
            <div className={styles["Layout-Body"]}>
                <Outlet />
            </div>
        </div>
    );
};
