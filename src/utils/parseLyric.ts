const timestampRegex = /\[\d{2}.*(\.\d+)?\]/;

const getLyricText = (text?: string) => {
  if (!text) return '';

  const lyricIndex = text?.indexOf('}\n[') || 0;
  let startIndex = 0;

  if (lyricIndex !== -1) {
    startIndex = lyricIndex + 2;
  }

  return text?.substring(startIndex);
};

export const parseLyric = (raw: string = '') => {
  if (!raw) return [];
  const lyricText = getLyricText(raw);
  const lyricList = lyricText.split('\n').filter(Boolean);

  return lyricList
    .map((item, index) => {
      const matched = item.match(timestampRegex);

      if (matched) {
        const time = matched[0].slice(1, -1);
        const text = item.replace(matched[0], '');
        const [seconds = 0, minutes = 0, hours = 0] = time
          .split(':')
          .reverse()
          .map((i) => +i || 0);

        const timestamp = +(hours * 3600 + minutes * 60 + seconds).toFixed(3);

        return { timestamp, text, key: index };
      }

      return { text: item, key: index, timestamp: 0 };
    })
    .filter((item) => item.text);
};
