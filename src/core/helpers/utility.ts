const zeroPad = (num: number, places: number | 1): string => {
  if (!num) return "";
  return String(num).padStart(places, "0");
};

const rsaConsoleLog = (
  message: string | "RSA Console Log: ",
  args?: any | ""
): void => {
  if (process.env.NODE_ENV === "development") console.log(message, args);
};

export { zeroPad, rsaConsoleLog };
