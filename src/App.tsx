import WordList from "@/components/word-list";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";
import WordListDisplay from "./components/word-list-display";
import { API_LIST } from "./constants";

function App() {
  const [editing, setEditing] = useState(true);
  const [wordList, setWordList] = useState<string[]>([]);

  const onSubmitEdit = async (list: string[]) => {
    setWordList(list);
    setEditing(false);
    for (const wordIndex in list) {
      const promiseList = await Promise.all(
        API_LIST.map((fn) => fn(list[wordIndex]))
      );
      console.log(promiseList);
    }
  };

  return (
    <Theme>
      <div className="flex h-screen w-screen">
        {/* input column */}
        <div className="w-[200px]">
          {editing ? (
            <WordList onSubmitEdit={onSubmitEdit} />
          ) : (
            <WordListDisplay wordList={wordList} currentIndex={0} />
          )}
        </div>
        {/* selection column */}
        <div className="">{wordList.join(",")}</div>
      </div>
    </Theme>
  );
}

export default App;
