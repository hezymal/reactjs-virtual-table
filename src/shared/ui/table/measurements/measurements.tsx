import {
    FC,
    ForwardedRef,
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";
import { Cell } from "../cell";
import { DEFAULT_CELL_WIDTH } from "../constants";
import { Row } from "../row";
import styles from "./measurements.module.scss";

export interface MeasurementsResult {
    rowHeight: number;
}

const useMeasurements = (forwardedRef: ForwardedRef<MeasurementsResult>) => {
    const rowRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(
        forwardedRef,
        () => {
            let rowHeight: number = 0;

            const calcRowHeight = () => {
                const rowElement = rowRef.current;
                const rowRect = rowElement.getBoundingClientRect();
                rowHeight = rowRect.height;
            };

            return {
                get rowHeight(): number {
                    if (rowHeight === 0) {
                        calcRowHeight();
                    }

                    return rowHeight;
                },
            };
        },
        []
    );

    return { rowRef };
};

export const Measurements: FC = forwardRef<MeasurementsResult>(
    (_, forwardedRef) => {
        const { rowRef } = useMeasurements(forwardedRef);

        return (
            <div className={styles.Measurements}>
                <div className={styles["Measurements-Row"]} ref={rowRef}>
                    <Row>
                        <Cell width={DEFAULT_CELL_WIDTH}>ROW</Cell>
                    </Row>
                </div>
            </div>
        );
    }
);
