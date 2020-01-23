const calculator = document.querySelector('.grid-container');
const numButtons = calculator.querySelectorAll('.num-button');
const opButtons = calculator.querySelectorAll('.op-button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const calcDisplay = calculator.querySelector('.calculator-display');
const oldDisplay = calculator.querySelector('.old-display');
let dataArray = [];

//console.log(numButtons)

function appendNumber(number) {
    currentDisplay = number;
}

function displayRefresh() {
    currentDisplay.innerText = currentDisplay;
}

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        const display = calcDisplay.innerText;
        console.log(button.innerText)
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
    })
})

clearButton.addEventListener('click', () => {
    clearCalc();
})

delButton.addEventListener('click', () => {
    deleteLast();
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

}