//Функция для проверки длины строки
const strLength = (str, maxLength) => str.length <= maxLength;
strLength('проверяемая строка', 20);

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
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (!isNaN(char)) {
      elements += char;
    }
  }
  return elements.length > 0 ? Number(elements) : NaN;
}
extractNumber('150');
