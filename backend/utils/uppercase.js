export function uppercaseRTO(number) {
  if (!number) return "";

  return number
    .toUpperCase() // convert to CAPITAL
    .replace(/\s+/g, "") // remove spaces
    .replace(/[^A-Z0-9]/g, "") // remove special chars
    .trim();
}
