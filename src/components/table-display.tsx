import { Table } from "@radix-ui/themes";
import classNames from "classnames";

interface TableDisplayProps {
  data: unknown;
  className?: string;
}
function TableDisplay({ data, className }: TableDisplayProps) {
  const entries = Object.entries(data ?? {});
  return (
    <Table.Root className={classNames("w-full display-item", className)} variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>key</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>value</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {entries.map((entry, index) => (
          <Table.Row key={index}>
            <Table.Cell>{entry[0]}</Table.Cell>
            <Table.Cell>
              <div dangerouslySetInnerHTML={{ __html: entry[1] }}></div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export default TableDisplay;
