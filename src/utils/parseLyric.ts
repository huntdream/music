import { LyricLine } from '../components/Lyric/Line';

const timestampRegex = /\[\d{2}.*(\.\d+)?\]/;

export const parseLyric = (raw: string = '') => {
  if (!raw) return [];

  const lyrics: LyricLine[] = [];

  raw.split('\n').forEach((line) => {
    const matched = line.match(timestampRegex);

    if (matched) {
      const time = matched[0].slice(1, -1);
      const text = line.replace(matched[0], '');
      const [seconds = 0, minutes = 0, hours = 0] = time
        .split(':')
        .reverse()
        .map((i) => +i || 0);

      const timestamp = +(hours * 3600 + minutes * 60 + seconds).toFixed(3);

      if (text) {
        lyrics.push({ timestamp, text, key: lyrics.length });
      }
    }
  });

  return lyrics;
};
