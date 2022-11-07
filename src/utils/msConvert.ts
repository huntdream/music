export const msToMinutes = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  return `${minutes}:${seconds}`;
};

export const msToHours = (ms: number) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.round((ms % 3600000) / 60000);

  let text = '';

  if (hours) {
    text = `${hours}小时`;
  }

  if (minutes) {
    text += `${minutes}分钟`;
  }

  return text;
};
