import { LyricLine } from '../components/Lyric/Line';

export const parseLyric = (raw: string, type: 'line' | 'word' = 'line') => {
  return type === 'word' ? parseLyricByWord(raw) : parseLyricByLine(raw);
};

export const parseLyricByWord = (raw: string = ''): LyricLine[] => {
  if (!raw) return [];
  const lyrics: LyricLine[] = [];
  const timestampRegex = /\[(\d+),(\d+)\](.*)/;
  raw.split('\n').forEach((line) => {
    const matched = line.match(timestampRegex);

    if (matched) {
      const [, timestamp, duration, text] = matched;
      const lineKey = lyrics.length + 1;
      const wordsMatch = text.matchAll(
        /\((\d+),(\d+),(\d+)\)\s*([^\(\)]+)(?=\s*\(|$)/g
      );

      const words: LyricLine[] = [...wordsMatch].map((wordMatch, index) => {
        const [, wordTimestamp, wordDuration, , word] = wordMatch;

        return {
          type: 'word',
          timestamp: +wordTimestamp / 1000,
          text: word,
          key: lineKey,
          wordKey: index + 1,
          duration: +wordDuration / 1000,
        };
      });

      lyrics.push({
        type: 'word',
        timestamp: +timestamp / 1000,
        text: words,
        key: lineKey,
      });
    }
  });

  return lyrics;
};

export const parseLyricByLine = (raw: string = ''): LyricLine[] => {
  if (!raw) return [];
  const timestampRegex = /\[\d{2}.*(\.\d+)?\]/;

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
        lyrics.push({ type: 'line', timestamp, text, key: lyrics.length });
      }
    }
  });

  return lyrics;
};
