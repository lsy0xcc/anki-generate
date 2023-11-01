import WordList from "@/components/word-list";
import { Theme } from "@radix-ui/themes";
import { useState } from "react";

function App() {
  const [editing, setEditing] = useState(true);
  const [wordList, setWordList] = useState<string[]>([]);

  const onBackToEdit = () => {
    setEditing(true);
  };

  const onSubmitEdit = (list: string[]) => {
    setWordList(list);
    setEditing(false);
  };

  return (
    <Theme>
      <div className="flex h-screen w-screen">
        {/* input column */}
        <div className="flex-1">
          <WordList
            editing={editing}
            onBackToEdit={onBackToEdit}
            onSubmitEdit={onSubmitEdit}
          ></WordList>
        </div>
        {/* selection column */}
        <div className="flex-[3]">{wordList.join(",")}</div>
      </div>
    </Theme>
  );
}

export default App;
