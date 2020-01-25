const calculator = document.querySelector('.grid-container');
const numButtons = calculator.querySelectorAll('.num-button');
const opButtons = calculator.querySelectorAll('.op-button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.op-decimal')
const calcDisplay = calculator.querySelector('.calculator-display');
const oldDisplay = calculator.querySelector('.old-display');
let opCheck = false;
let dataArray = [];
let calculationDone = false;

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        const display = calcDisplay.innerText;
        if (display == 0) {
            calcDisplay.textContent = button.innerText;
        } else if (calculationDone == true) {
            calcDisplay.textContent = button.innerText;
            calculationDone = false;
        } else {
            calcDisplay.textContent = display + button.innerText;
        }
        opCheck = false;
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (opCheck == true) {
            return
        } else {
            dataArray.push(calcDisplay.textContent);
            dataArray.push(button.textContent)
            oldDisplay.textContent += calcDisplay.textContent + ' ' + button.textContent + ' ';
            calcDisplay.textContent = '';
            calculationDone = false;
            opCheck = true;
        }
    })
})

decimalButton.addEventListener('click', () => {
    calcDisplay.textContent = calcDisplay.innerText + decimalButton.innerText
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
    calculationDone = false;
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
    calcDisplay.textContent = roundNumber(dataArray[0]);
    dataArray = [];
    oldDisplay.textContent = '';
    calculationDone = true;
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
    if (b == 0) {
        window.alert('This is an illegal operation! Please do not divide by 0 you KLUTZ!');
        return undefined;
    } else {
        return a / b;
    }
}

function roundNumber(num) {
    return Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6);
}

document.addEventListener("keydown", function(event) {
    console.log(event.which);
})
/* TO DO LIST
5) Add keyboard support
*/