export function shiftLastChar(input: string): string {
  if (!input) return "";

  const lastChar = input[input.length - 1];

  // Check if lastChar is a letter
  if (/^[a-zA-Z]$/.test(lastChar)) {
    const aCode = "a".charCodeAt(0); // 97
    const ACode = "A".charCodeAt(0); // 65
    const alphabetSize = 26;
    let shiftedCode = lastChar.charCodeAt(0);

    if (lastChar >= "a" && lastChar <= "z") {
      shiftedCode = ((shiftedCode - aCode + 2) % alphabetSize) + aCode;
    } else if (lastChar >= "A" && lastChar <= "Z") {
      shiftedCode = ((shiftedCode - ACode + 2) % alphabetSize) + ACode;
    }
    return input.slice(0, -1) + String.fromCharCode(shiftedCode);
  }

  // if it's space or non-letter, leave as is
  return input;
}
