let isShort = (string, stringLength) => string.length <= stringLength;

function isPalindrome (string) {
  let normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return normalizedString == reversedString;
}

function findNumbers (string) {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    number = parseInt(string[i]);
    if (!Number.isNaN(number)) {
      result += string[i];
    }
  }
  return parseInt(result);
}
