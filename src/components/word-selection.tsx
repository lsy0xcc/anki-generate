import { Checkbox } from "@radix-ui/themes";
import TableDisplay from "./table-display";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface WordSelectionProps<T extends Record<string, string>> {
  dataList: T[];
  onCheckedListChanged: (checkedList: boolean[]) => void;
  className?: string;
}

function WordSelection<T extends Record<string, string>>(
  props: WordSelectionProps<T>
) {
  const { dataList, onCheckedListChanged, className } = props;

  const [checkedList, setCheckedList] = useState<boolean[]>([]);
  useEffect(() => {
    setCheckedList(
      dataList.length === 1 ? [true] : new Array(dataList.length).fill(false)
    );
  }, [dataList]);

  const onCheckedChange = (index: number, value: boolean | string) => {
    const newCheckedList = [...checkedList];
    newCheckedList[index] = !!value;
    setCheckedList(newCheckedList);
    onCheckedListChanged(newCheckedList);
  };
  return (
    <div
      className={classNames("flex flex-col gap-2 border rounded-lg", className)}
    >
      {props.dataList.map((e, index) => (
        <div key={index} className={"flex gap-2 pl-4"}>
          <Checkbox
            checked={checkedList?.[index]}
            onCheckedChange={(value) => {
              onCheckedChange(index, value);
            }}
            className="sticky left-4 top-4"
          />
          <TableDisplay
            data={e}
            className={checkedList?.[index] ? "!bg-blue-500/50" : ""}
          ></TableDisplay>
        </div>
      ))}
    </div>
  );
}

export default WordSelection;
