const calculator = document.querySelector('.grid-container');
const numButtons = calculator.querySelectorAll('.num-button');
const opButtons = calculator.querySelectorAll('.op-button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const calcDisplay = calculator.querySelector('.calculator-display');

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

console.log(clearButton)

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        
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
