const localStorageKey = 'operations';
const operationsValues = JSON.parse(localStorage.getItem(localStorageKey) || '[]')
const result = document.getElementById('result');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = '';
let firstOperand = null;
let operator = null;
let restart = false;
let resultValue;
let acc = '';
let operation = '';

function updateResult(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber;
};

function addDigit(digit) {
  if (digit === '.' && (currentNumber.includes('.') || !currentNumber))
    return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  };

  updateResult();
  acc += digit;
};

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();
  };

  firstOperand = parseFloat(currentNumber);
  currentNumber = '';
  operator = newOperator;
  acc += newOperator;
};

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber);


  switch (operator) {
    case '+':
      resultValue = firstOperand + secondOperand;
      break;
    case '–':
      resultValue = firstOperand - secondOperand;
      break;
    case '×':
      resultValue = firstOperand * secondOperand;
      break;
    case '÷':
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  };

  if (resultValue.toString().split('.')[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  };

  operator = null;
  firstOperand = null;
  restart = true;
  updateResult();
};

function clearCalculator() {
  currentNumber = '';
  firstOperand = null;
  operator = null;
  updateResult(true);
  acc = '';
  operation = '';
}

function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (['+', '-'].includes(operator)) {
    result = result * (firstOperand || 1);
  };

  if (result.toString().split('.')[1]?.length > 5) {
    result = result.toFixed(5).toString();
  };

  currentNumber = result.toString();
  updateResult();
  acc += '%';
};

function saveOperation() {
  operationsValues.push({
    Operation: operation,
  });

  localStorage.setItem(localStorageKey, JSON.stringify(operationsValues));

  showOperationHistory();
};

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.innerText;
    if (/^[0-9.]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (['+', '–', '×', '÷'].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === '=') {
      calculate();
      operation = acc + ' = ' + resultValue;
      console.log(operation);
      saveOperation();
      acc = '';
    } else if (buttonText === 'AC') {
      clearCalculator();
    } else if (buttonText === '±') {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      acc = '-' + acc;
      updateResult();
    } else if (buttonText === '%') {
      setPercentage();
    };
  });
});

function showOperationHistory() {
  const history = document.getElementById('operations-list');

  history.innerHTML = '';

  for (let i = 0; i < operationsValues.length; i++) {
    history.innerHTML += `
        <li>
          Operation ${i + 1}: <strong>${operationsValues[i].Operation}</strong>
        </li>
      `
  }
};

showOperationHistory();