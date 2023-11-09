import WordList from "@/components/word-list";
import { Button, Theme } from "@radix-ui/themes";
import { useRequest } from "ahooks";
import { useState } from "react";
import WordListDisplay from "./components/word-list-display";
import WordSelection from "./components/word-selection";
import { DataList } from "./types";
import { addToAnki, convertResult, getWordData, requestAuth } from "./utils";

function App() {
  const [editing, setEditing] = useState(true);
  const [deckName, setDeckName] = useState("");
  const [modelName, setModelName] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedList, setSelectedList] = useState<boolean[][]>([]);

  const {
    runAsync: runGetWordData,
    data: currentWordData,
    loading: getResultLoading,
  } = useRequest(getWordData, {
    manual: true,
  });

  const { runAsync: runAddToAnki, loading: addToAnkiLoading } = useRequest(
    addToAnki,
    { manual: true }
  );

  const onSubmitEdit = async (
    deckName: string,
    modelName: string,
    tagList: string[],
    wordList: string[]
  ) => {
    if (wordList && wordList[0]) {
      setDeckName(deckName);
      setTagList(tagList);
      setWordList(wordList);
      setModelName(modelName);
      setEditing(false);
      setCurrentIndex(0);
      await requestAuth();
      await beforeSelectWordData(wordList[0]);
    }
  };

  const onCancelEdit = () => {
    setEditing(true);
  };

  const beforeSelectWordData = async (word: string) => {
    const result = await runGetWordData(word);
    if (
      result &&
      result.reduce((prev, curr) => prev && curr.length === 1, true)
    ) {
      await addNote(result);
      await endSelectWordData();
    }
  };

  const endSelectWordData = async () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    if (newIndex < wordList.length) {
      await beforeSelectWordData(wordList[newIndex]);
    } else {
      setEditing(true);
    }
  };

  const onCheckedListChanged = (newList: boolean[], index: number) => {
    const newSelectedList = [...selectedList];
    newSelectedList[index] = newList;
    setSelectedList(newSelectedList);
  };

  const onAddWordClicked = async () => {
    const result = currentWordData?.map((list, listIndex) =>
      (list as unknown[]).filter(
        (_item, itemIndex) => selectedList?.[listIndex]?.[itemIndex]
      )
    ) as DataList;
    await addNote(result);
  };

  const addNote = async (result: DataList) => {
    console.log(deckName, modelName, tagList, convertResult(result));
    const ankiResult = await runAddToAnki(
      deckName,
      modelName,
      tagList,
      convertResult(result)
    );
    console.log(ankiResult);
    await endSelectWordData();
  };
  return (
    <Theme>
      <div className="flex h-screen w-screen">
        {/* input column */}
        <div className="w-[200px] min-w-[200px] p-2">
          {editing ? (
            <WordList onSubmitEdit={onSubmitEdit} />
          ) : (
            <WordListDisplay
              deckName={deckName}
              tagList={tagList}
              wordList={wordList}
              currentIndex={currentIndex}
              onCancelEdit={onCancelEdit}
            />
          )}
        </div>
        {/* selection column */}
        <div className="flex flex-1 flex-col gap-2 overflow-x-auto p-2">
          {getResultLoading || addToAnkiLoading ? (
            <div>loading</div>
          ) : editing ? (
            <div className="flex-1">wait for edit</div>
          ) : (
            <>
              <div className="flex h-full flex-1 gap-2 overflow-y-auto">
                {currentWordData?.map((e, index) => {
                  return (
                    <WordSelection
                      dataList={e}
                      onCheckedListChanged={(list) => {
                        onCheckedListChanged(list, index);
                      }}
                      key={index}
                      className="h-full w-full min-w-[400px] overflow-y-auto"
                    ></WordSelection>
                  );
                })}
              </div>
              <div>
                <Button className="w-full" onClick={onAddWordClicked}>
                  Add
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </Theme>
  );
}

export default App;
