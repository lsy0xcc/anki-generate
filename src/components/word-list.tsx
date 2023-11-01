import { Button, TextArea } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";

interface WordListProps {
  editing: boolean;
  onSubmitEdit: (wordList: string[]) => void;
  onBackToEdit: () => void;
}

function WordList(props: WordListProps) {
  const { editing, onSubmitEdit, onBackToEdit } = props;
  const [wordListText, setWordListText] = useState("");

  const onWordListTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWordListText(event.currentTarget.value);
  };
  const onCancelButtonClick = () => {
    onBackToEdit?.();
  };
  const onEditSubmitButtonClick = () => {
    onSubmitEdit?.(wordListText.split("\n"));
  };

  return (
    <div className="h-full w-full flex flex-col">
      <p>word list</p>
      {editing ? (
        <TextArea
          className="flex-1"
          placeholder="Reply to comment…"
          value={wordListText}
          onChange={onWordListTextChange}
        />
      ) : (
        <div className="flex-1">{wordListText}</div>
      )}
      {editing ? (
        <Button onClick={onEditSubmitButtonClick}>Submit</Button>
      ) : (
        <Button onClick={onCancelButtonClick}>Back</Button>
      )}
    </div>
  );
}

export default WordList;
