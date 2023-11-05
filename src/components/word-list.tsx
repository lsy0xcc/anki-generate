import { Button, TextArea } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";

interface WordListProps {
  onSubmitEdit: (wordList: string[]) => void;
}

function WordList(props: WordListProps) {
  const { onSubmitEdit } = props;
  const [wordListText, setWordListText] = useState("上\n下");

  const onWordListTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWordListText(event.currentTarget.value);
  };

  const onEditSubmitButtonClick = () => {
    onSubmitEdit?.(wordListText.split("\n"));
  };

  return (
    <div className="h-full w-full flex flex-col">
      <p>word list</p>
      <TextArea
        className="flex-1"
        placeholder="Reply to comment…"
        value={wordListText}
        onChange={onWordListTextChange}
      />
      <Button onClick={onEditSubmitButtonClick}>Submit</Button>
    </div>
  );
}

export default WordList;
