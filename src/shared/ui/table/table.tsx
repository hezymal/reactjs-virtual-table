import { useLayoutEffect, useRef, useState } from "react";
import { Head } from "./head";
import { HeadCell } from "./head-cell";
import { Body } from "./body";
import { Row } from "./row";
import { Cell } from "./cell";
import { DEFAULT_CELL_WIDTH } from "./constants";
import { Measurements, MeasurementsResult } from "./measurements";
import { TableColumn } from "./types";
import styles from "./table.module.scss";

interface TableProps<TItem> {
    columns: TableColumn[];
    items: TItem[];
    height: number;
}

function useTable<TItem>(items: TItem[]) {
    const [viewRange, setViewRange] = useState([0, 0]);

    const measurementsResultRef = useRef<MeasurementsResult>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const measurementsResult = measurementsResultRef.current;
        const headElement = headRef.current;
        const bodyElement = bodyRef.current;
        const rowsElement = rowsRef.current;

        const updateRows = () => {
            const bodyRect = bodyElement.getBoundingClientRect();
            const bodyHeight = bodyRect.height;
            const bodyScrollTop = bodyElement.scrollTop;

            const rowHeight = measurementsResult.rowHeight;
            const rowsHeight = items.length * rowHeight;

            const startIndex = Math.floor(bodyScrollTop / rowHeight);
            const rowsCount = Math.floor(bodyHeight / rowHeight) + 1;
            const endIndex = startIndex + rowsCount;

            bodyElement.style.height = `${bodyHeight}px`;
            rowsElement.style.height = `${rowsHeight}px`;
            rowsElement.style.paddingTop = `${startIndex * rowHeight}px`;

            setViewRange([startIndex, endIndex]);
        };

        const updateColumns = () => {
            const bodyScrollLeft = bodyElement.scrollLeft;
            headElement.scrollLeft = bodyScrollLeft;
        };

        const handleBodyElementScroll = () => {
            updateColumns();
            updateRows();
        };

        const init = () => {
            bodyElement.addEventListener("scroll", handleBodyElementScroll);
            updateColumns();
            updateRows();
        };

        const destroy = () => {
            bodyElement.addEventListener("scroll", handleBodyElementScroll);
        };

        init();
        return destroy;
    }, [items]);

    return {
        viewRange,
        measurementsResultRef,
        headRef,
        bodyRef,
        rowsRef,
    };
}

export function Table<TItem>(props: TableProps<TItem>) {
    const { columns, items, height } = props;
    const { viewRange, measurementsResultRef, headRef, bodyRef, rowsRef } =
        useTable(items);

    return (
        <div className={styles.Table} style={{ height: `${height}px` }}>
            <Measurements ref={measurementsResultRef} />
            <Head ref={headRef}>
                <Row>
                    {columns.map((column) => (
                        <HeadCell key={column.key} width={DEFAULT_CELL_WIDTH}>
                            {column.key}
                        </HeadCell>
                    ))}
                </Row>
            </Head>
            <Body ref={bodyRef}>
                <div ref={rowsRef}>
                    {items
                        .slice(viewRange[0], viewRange[1])
                        .map((item, index) => (
                            <Row key={index}>
                                {columns.map((column) => (
                                    <Cell
                                        key={column.key}
                                        width={DEFAULT_CELL_WIDTH}
                                    >
                                        {item[column.key]}
                                    </Cell>
                                ))}
                            </Row>
                        ))}
                </div>
            </Body>
        </div>
    );
}
