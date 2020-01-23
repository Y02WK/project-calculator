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
    }
    if (!dataArray.includes('x') && !dataArray.includes('÷')) {
        while (dataArray.length > 1) {
            if (dataArray[1] = '+') {
                calculations = addition(parseFloat(dataArray[0]), parseFloat(dataArray[2]))
                console.log(calculations)
                dataArray.unshift(calculations);
                dataArray.splice(1 ,3);
                console.log(dataArray);
            }
        }
    }
    calcDisplay.textContent = calculations;
    dataArray = [];
    oldDisplay.textContent = '';
}

function addition(a, b) {
    return a + b;
}
