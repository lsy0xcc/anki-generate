export const getJpZh = async (word: string) => {
  try {
    const result = await fetch("/jp-zh/search-anki/" + word);
    return result.json();
  } catch (e) {
    return e;
  }
};

export const getNhk = async (word: string) => {
  try {
    const result = await fetch("/nhk/search-anki/" + word);
    return result.json();
  } catch (e) {
    return e;
  }
};
