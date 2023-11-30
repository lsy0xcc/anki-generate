import { Button } from "@radix-ui/themes";

interface WordListDisplayProps {
  deckName: string;
  tagList: string[];
  wordList: string[];
  currentIndex: number;
  onCancelEdit: () => void;
}
function WordListDisplay(props: WordListDisplayProps) {
  const { deckName, tagList, wordList, currentIndex, onCancelEdit } = props;
  return (
    <div className="flex h-full flex-col overflow-y-scroll">
      <div>{deckName}</div>
      <div>{tagList}</div>
      <div>
        {currentIndex + 1}/{wordList.length}
      </div>
      <div className="flex-1">
        {wordList.map((e, index) => (
          <div key={index}>{e}</div>
        ))}
      </div>
      <div>
        <Button className="w-full" onClick={onCancelEdit}>
          cancel
        </Button>
      </div>
    </div>
  );
}

export default WordListDisplay;
