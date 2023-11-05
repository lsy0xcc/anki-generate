interface WordListDisplayProps {
  wordList: string[];
  currentIndex: number;
}
function WordListDisplay(props: WordListDisplayProps) {
  return (
    <div>
      {props.wordList.map((e, index) => (
        <div key={index}>{e}</div>
      ))}
    </div>
  );
}

export default WordListDisplay;
