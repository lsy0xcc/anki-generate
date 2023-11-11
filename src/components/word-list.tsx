import { Button, TextArea } from "@radix-ui/themes";
import { useState } from "react";

interface WordListProps {
  onSubmitEdit: (
    deckName: string,
    modelName: string,
    tagList: string[],
    wordList: string[]
  ) => void;
}

function WordList(props: WordListProps) {
  const { onSubmitEdit } = props;
  const [deckName, setDeckName] = useState("anki test");
  const [modelName, setModelName] = useState("full word");
  const [tagList, setTagList] = useState("新编日语第一册");
  const [wordList, setWordLis] = useState("");

  const onEditSubmitButtonClick = () => {
    onSubmitEdit?.(
      deckName,
      modelName,
      tagList.split("\n").filter((e) => e),
      wordList.split("\n").filter((e) => e)
    );
  };

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <p>deck name</p>
      <TextArea
        rows={1}
        value={deckName}
        onChange={(event) => {
          setDeckName(event.currentTarget.value);
        }}
      />
      <p>model name</p>
      <TextArea
        value={modelName}
        onChange={(event) => {
          setModelName(event.currentTarget.value);
        }}
      />
      <p>tags</p>
      <TextArea
        value={tagList}
        onChange={(event) => {
          setTagList(event.currentTarget.value);
        }}
      />
      <p>word list</p>
      <TextArea
        className="flex-1"
        value={wordList}
        onChange={(event) => {
          setWordLis(event.currentTarget.value);
        }}
      />

      <Button onClick={onEditSubmitButtonClick}>Submit</Button>
    </div>
  );
}

export default WordList;
