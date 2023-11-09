import { AudioItem, DataList, JpzhType, NhkType } from "@/types";

export const getJpzh: (word: string) => Promise<JpzhType[]> = async (
  word: string
) => {
  const result = await fetch("/jp-zh/search-anki/" + word);
  return result.json();
};

export const getNhk: (word: string) => Promise<NhkType[]> = async (
  word: string
) => {
  const result = await fetch("/nhk/search-anki/" + word);
  return result.json();
};

export const getWordData: (word: string) => Promise<DataList> = async (
  word: string
) => {
  const jpzhResult = await getJpzh(word);
  const nhkResult = await getNhk(word);
  return [jpzhResult, nhkResult];
};
const NHK_AUDIO_PREFIX = "https://0xcc.top/dict/nhk/search/";
export const convertResult = (result: DataList) => {
  const jpzhResult: DataList[0][0] = {};
  let priority = 0;
  result[0].forEach((jpzhItem) => {
    let key: keyof DataList[0][0];
    const currentPriority = parseInt(jpzhItem?.priority ?? "0") || 0;
    priority = Math.max(priority, currentPriority);
    for (key in jpzhItem) {
      if (jpzhResult[key] && jpzhItem[key]) {
        jpzhResult[key] =
          jpzhResult?.[key] +
          `<div class="jpzh-${key}-item">${jpzhItem?.[key]}</div>`;
      } else if (!jpzhResult[key]) {
        jpzhResult[key] = `<div class="jpzh-${key.replace(/[A-Z]/g, (match) => {
          return "-" + match.toLowerCase();
        })}">${jpzhItem?.[key]}</div>`;
      }
    }
  });
  jpzhResult.priority = `<div class="jpzh-priority">${"*".repeat(
    priority
  )}</div>`;
  const nhkTemp = result[1].map((nhkItem, index) => {
    const {
      title,
      dataList,
      pronHtml,
      pronLink,
      ptclHtml,
      ptclLink,
      egHtml,
      egLink,
    } = nhkItem;
    const pron: AudioItem = {
      html: pronHtml,
      link: NHK_AUDIO_PREFIX + pronLink,
      fileName: generateFileName(title, index, "pron"),
    };
    const ptcl: AudioItem = {
      html: ptclHtml,
      link: NHK_AUDIO_PREFIX + ptclLink,
      fileName: generateFileName(title, index, "ptcl"),
    };
    const eg: AudioItem = {
      html: egHtml,
      link: NHK_AUDIO_PREFIX + egLink,
      fileName: generateFileName(title, index, "eg"),
    };

    return {
      title,
      dataList,
      pron: pronHtml && pronLink ? pron : undefined,
      ptcl: ptclHtml && pronLink ? ptcl : undefined,
      eg: egHtml && egLink ? eg : undefined,
    };
  });

  const audioList = nhkTemp
    .map((e) => [e.pron, e.ptcl, e.eg])
    .flat()
    .filter((e) => e)
    .map((e) => ({
      url: e?.link,
      filename: e?.fileName,
      fields: ["NHK audio"],
    }));
  const fullAudioContent = nhkTemp
    .map((e) => {
      const pron = e.pron ? audioTemplate("pron", true, e.pron) : "";
      const ptcl = e.ptcl ? audioTemplate("ptcl", true, e.ptcl) : "";
      const eg = e.eg ? audioTemplate("ptcl", true, e.eg) : "";
      return `<div class="nhk-full-audio-item">${pron}${ptcl}${eg}</div>`;
    })
    .join("");
  const pronAudioContent = nhkTemp
    .map((e) => {
      const pron = e.pron ? audioTemplate("pron", true, e.pron) : "";
      return `<div class="nhk-pron-audio-item">${pron}</div>`;
    })
    .join("");
  const egAudioContent = nhkTemp
    .map((e) => {
      const eg = e.eg ? audioTemplate("ptcl", false, e.eg) : "";
      return `<div class="nhk-eg-audio-item">${eg}</div>`;
    })
    .join("");
  const fullAudio = fullAudioContent
    ? `<div class="nhk-full-audio">${fullAudioContent}</div>`
    : undefined;
  const pronAudio = pronAudioContent
    ? `<div class="nhk-pron-audio">${pronAudioContent}</div>`
    : undefined;
  const egAudio = egAudioContent
    ? `<div class="nhk-eg-audio">${egAudioContent}</div>`
    : undefined;

  return removeEmpty({
    ...jpzhResult,
    audio: audioList,
    fullAudio,
    pronAudio,
    egAudio,
  });
};

export const generateFileName = (
  title = "unknown",
  index: number,
  type: "pron" | "ptcl" | "eg"
) => {
  return `${title}_${type}_${index + 1}_${Math.random()
    .toString(36)
    .substring(2)}.spx`;
};

export const audioTemplate = (
  type: string,
  showHtml: boolean,
  input?: AudioItem
) => {
  if (!input) {
    return "";
  } else {
    return `<div class="nhk-${type}-item">[sound:${input.fileName}]${
      showHtml ? input.html : ""
    }</div>`;
  }
};

const removeEmpty = (obj: Record<string, unknown>) => {
  Object.keys(obj).forEach((k) => obj[k] == null && delete obj[k]);
  return obj;
};

export const requestAuth = async () => {
  const result = await fetch("/anki/", {
    method: "POST",
    body: JSON.stringify({
      action: "requestPermission",
      version: 6,
    }),
  });
  return result.json();
};

export const addToAnki = async (
  deckName: string,
  modelName: string,
  tags: string[],
  data: Record<string, unknown> & { audio?: AudioItem[] }
) => {
  const audio = data.audio;
  delete data.audio;
  const result = await fetch("/anki/", {
    method: "POST",
    // referrerPolicy: "no-referrer",
    body: JSON.stringify({
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName,
          modelName,
          tags,
          audio,
          fields: { date: new Date().toISOString(), ...data },
        },
      },
    }),
  });
  return result.json();
};
