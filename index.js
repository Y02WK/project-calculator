const calculator = document.querySelector('.grid-container');
const numButtons = calculator.querySelectorAll('.num-button');
const opButtons = calculator.querySelectorAll('.op-button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const calcDisplay = calculator.querySelector('.calculator-display');
const oldDisplay = calculator.querySelector('.old-display');
let dataArray = [];

function appendNumber(number) {
    currentDisplay = number;
}

function displayRefresh() {
    currentDisplay.innerText = currentDisplay;
}

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        const display = calcDisplay.innerText;
        if (display == 0) {
            calcDisplay.textContent = button.innerText;
        } else if (display > 0) {
            calcDisplay.textContent = display + button.innerText;
        }
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        dataArray.push(calcDisplay.textContent);
        oldDisplay.textContent += calcDisplay.textContent + ' ' + button.textContent + ' ';
        calcDisplay.textContent = '';
        dataArray.push(button.textContent)
        console.log(dataArray)
    })
})

clearButton.addEventListener('click', () => {
    clearCalc();
})

delButton.addEventListener('click', () => {
    deleteLast();
})

equalsButton.addEventListener('click', () => {
    operate();
})

function clearCalc() {
    calcDisplay.textContent = 0;
    oldDisplay.textContent = '';
    dataArray = [];
 }

function deleteLast() {
    const display = calcDisplay.innerText;
    if (display != 0) {
        if (display.length > 1) {
            calcDisplay.textContent = display.substring(0, display.length -1);
        } else if (display.length == 1) {
            calcDisplay.textContent = 0;
        }
    }
}

function operate() {
    let calculations = 0;
    if (calcDisplay.textContent != '') {
        dataArray.push(calcDisplay.textContent);
        while (dataArray.length > 1) {
            if (!dataArray.includes('x') && !dataArray.includes('÷')) {
                if (dataArray[1] == '+') {
                    calculations = addition(parseFloat(dataArray[0]), parseFloat(dataArray[2]))
                    dataArray.splice(0 ,3, calculations);
                } else if (dataArray[1] == '-') {
                    calculations = subtract(parseFloat(dataArray[0]), parseFloat(dataArray[2]))
                    dataArray.splice(0 ,3, calculations);
                }
            } else if (dataArray.includes('x') && dataArray.includes('÷')) {
                const multiplyIndex = dataArray.indexOf('x');
                const diviIndex = dataArray.indexOf('÷');
                if (multiplyIndex < diviIndex) {
                    calculations = multiply(parseFloat(dataArray[multiplyIndex-1]), parseFloat(dataArray[multiplyIndex+1]))
                    dataArray.splice(multiplyIndex-1 ,3, calculations)
                } else {
                    calculations = divide(parseFloat(dataArray[diviIndex-1]), parseFloat(dataArray[diviIndex+1]))
                    dataArray.splice(diviIndex-1 ,3, calculations)
                }
            } else if (dataArray.includes('x')) {
                const multiplyIndex = dataArray.indexOf('x');
                calculations = multiply(parseFloat(dataArray[multiplyIndex-1]), parseFloat(dataArray[multiplyIndex+1]))
                dataArray.splice(multiplyIndex-1 ,3, calculations)
            } else if (dataArray.includes('÷')) {
                const diviIndex = dataArray.indexOf('÷');
                calculations = divide(parseFloat(dataArray[diviIndex-1]), parseFloat(dataArray[diviIndex+1]))
                dataArray.splice(diviIndex-1 ,3, calculations)
            } 
        }
    }
    calcDisplay.textContent = dataArray[0];
    dataArray = [];
    oldDisplay.textContent = '';
}

function addition(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b
}

function divide(a ,b) {
    return a / b;
}

/* TO DO LIST

1) Add decimal place functionality.
2) Add check to allow reset when inputting numbers after an equals operation. 
3) Add check to disable input of operator button more than once in a row.
4) Add check to disable division by 0.
5) Add keyboard support
6) Implement rounding of displayed result
*/