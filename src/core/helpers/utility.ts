const zeroPad = (num: number, places: number | 1): string => {
  if (!num) return "";
  return String(num).padStart(places, "0");
};

const rsaConsoleLog = (
  message = "RSA Console Log: " as string,
  args = "" as string | any
): void => {
  if (process.env.NODE_ENV === "development") console.log(message, args);
};

const dateFormatting = (date: Date, language = "it-IT") => {
  return new Date(date).toLocaleDateString(language);
};

export { zeroPad, rsaConsoleLog, dateFormatting };
