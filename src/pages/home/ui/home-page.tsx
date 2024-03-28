import { FC } from "react";
import { Table, TableColumn } from "@/shared/ui/table";

const createColumnKey = (index: number) => {
    return String.fromCharCode("A".charCodeAt(0) + index);
};

const createColumns = (startIndex: number, endIndex: number): TableColumn[] => {
    const columns: TableColumn[] = [];

    for (let index = startIndex; index <= endIndex; index++) {
        columns.push({ key: createColumnKey(index) });
    }

    return columns;
};

const createItems = (
    columns: TableColumn[],
    startIndex: number,
    endIndex: number
): Record<string, string>[] => {
    const items: Record<string, string>[] = [];

    for (let index = startIndex; index <= endIndex; index++) {
        const item: Record<string, string> = {};

        for (const column of columns) {
            item[column.key] = `${index}:${column.key}`;
        }

        items.push(item);
    }

    return items;
};

const columns = createColumns(0, 25);
const items = createItems(columns, 1, 1000);

export const HomePage: FC = () => {
    return <Table columns={columns} items={items} height={400} />;
};
