//TODO add imports if needed
//import { exMain } from "./exclude/exampleAss2.js"
//TODO add/change doc as needed
/**
 * Autor: Peter Benko 7643-1690-1
 * Převod čísla mezi dvojkovou (2) a šestnáctkovou (16) soustavou.
 * @param {string} inputNumber number that is being converted
 * @param {number} inputNumberSystem numerical system that the inputNumber is being converted from
 * @param {number} outputNumberSystem numerical system that the inputNumber is being converted into
 * @returns {string} containing number converted to output system
 */
export function main(inputNumber, inputNumberSystem, outputNumberSystem) {
  // povolené soustavy – kontrola proti nesmyslným vstupům
  if (!permittedInputSystems().includes(inputNumberSystem)) {
    throw new Error("Unsupported input number system");
  }
  if (!permittedOutputSystems().includes(outputNumberSystem)) {
    throw new Error("Unsupported output number system");
  }

  // pokud je vstupní a výstupní soustava stejná, není co převádět
  if (inputNumberSystem === outputNumberSystem) {
    return String(inputNumber);
  }

  // zpracování vstupu – ořízneme mezery a zjistíme případné znaménko
  const inputStr = String(inputNumber).trim();
  if (inputStr.length === 0) {
    throw new Error("Empty input");
  }

  const isNegative = inputStr[0] === "-";
  const magnitudeStr = isNegative ? inputStr.slice(1) : inputStr;

  // 1) převod z inputNumberSystem (2) do desítkové soustavy
  const decimalValue = convertToDecimal(magnitudeStr, inputNumberSystem);

  // 2) převod z desítkové soustavy do outputNumberSystem (16)
  const converted = convertFromDecimal(decimalValue, outputNumberSystem);

  // přidáme zpátky znaménko, pokud bylo
  return isNegative ? "-" + converted : converted;
}

/**
 * Převod řetězce představujícího číslo v dané soustavě na desítkové číslo.
 * @param {string} numberStr
 * @param {number} base
 * @returns {number}
 */
function convertToDecimal(numberStr, base) {
  let value = 0;

  for (let i = 0; i < numberStr.length; i++) {
    const ch = numberStr[i].toUpperCase();
    const digit = charToDigit(ch);

    if (digit >= base) {
      throw new Error("Digit not valid for given base");
    }

    value = value * base + digit;
  }

  return value;
}

/**
 * Převod desítkového čísla na řetězec v cílové číselné soustavě (16).
 * @param {number} value
 * @param {number} base
 * @returns {string}
 */
function convertFromDecimal(value, base) {
  if (value === 0) {
    return "0";
  }

  let resultDigits = [];
  let current = value;

  while (current > 0) {
    const digit = current % base;
    current = Math.floor(current / base);
    resultDigits.push(digitToChar(digit));
  }

  // číslice se získávají odzadu, proto je otočíme
  return resultDigits.reverse().join("");
}

/**
 * Převede znak číslice na číselnou hodnotu.
 * @param {string} ch
 * @returns {number}
 */
function charToDigit(ch) {
  if (ch >= "0" && ch <= "9") {
    return ch.charCodeAt(0) - "0".charCodeAt(0);
  }

  if (ch >= "A" && ch <= "Z") {
    return ch.charCodeAt(0) - "A".charCodeAt(0) + 10;
  }

  throw new Error("Invalid digit: " + ch);
}

/**
 * Převede číselnou hodnotu číslice na znak.
 * @param {number} digit
 * @returns {string}
 */
function digitToChar(digit) {
  if (digit >= 0 && digit <= 9) {
    return String.fromCharCode("0".charCodeAt(0) + digit);
  }

  // 10 -> 'A', 11 -> 'B', ..., 15 -> 'F'
  return String.fromCharCode("A".charCodeAt(0) + (digit - 10));
}

/**
 * Function which returns which number systems are permitted on input.
 * V tomhle řešení převádíme **z dvojkové soustavy (2)**.
 * @returns {Array<number>} array of numbers refering to permitted input systems
 */
export function permittedInputSystems() {
  return [2];
}

/**
 * Function which returns which number systems are permitted on output.
 * V tomhle řešení převádíme **do šestnáctkové soustavy (16)**.
 * @returns {Array<number>} array of numbers refering to permitted output systems
 */
export function permittedOutputSystems() {
  return [16];
}