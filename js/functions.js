//Функция для проверки длины строки
function strLenght(str, maxLength) {
  const result = str.length <= maxLength;
  return result;
}
strLenght('всем привет', 10);

//Или стрелочная:
//const strLength = (str, maxLength) => str.length <= maxLength;

//Функция для проверки, является ли строка палиндромом
function isPalindrome(str) {
  const normalizedString = str.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}
isPalindrome('А роза упала на лапу Азора');

//Дополнительное задание
function extractNumber(str) {
  if (typeof str === 'number') {
    str = str.toString();
  }
  let elements = '';
  for (let i = 0; i < str.lenght; i++) {
    const char = str[i];
    const num = parseInt(char, 10);

    if (!Number.isNaN(num)) {
      elements += char;
    }
  }
  return elements.length > 0 ? parseInt(elements, 10) : NaN;
}
extractNumber('погода15');
