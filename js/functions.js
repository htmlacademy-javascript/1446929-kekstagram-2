const isLengthValid = (str = '', maxLength = 0) => str.length <= maxLength;

isLengthValid('Hello World', 20);

const isPalindrom = (str = '') => {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';

  for (let i = normalizedStr.length - 1; i >= 0; i--) {
    reversedStr += normalizedStr[i];
  }

  return normalizedStr === reversedStr;
};

isPalindrom();
