import { JpzhType } from "@/types";

type Exam = Partial<{
  jp: string;
  zh: string;
}>;
type DefItem = Partial<{
  index: string;
  jp: string;
  zh: string;
  exam: Exam[];
  anti: string[];
  syns: string[];
}>;
type Def = Partial<{
  type: string;
  def: DefItem[];
  note: string;
}>;
type ApiResult = Partial<{
  priority: number;
  spell: string;
  kana: string;
  tune: string;
  wordsWithSymbol: string[];
  origin: string;
  defs: Def[];
}>;

const jpzhConvert: (data: ApiResult) => Promise<JpzhType> = async (
  data: ApiResult
) => {
  try {
    return (
      await fetch("/jp-zh/convert-data", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  } catch (e) {
    console.error(e);
    return {};
  }
};
export default jpzhConvert;
