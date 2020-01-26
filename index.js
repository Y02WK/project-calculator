const calculator = document.querySelector('.grid-container');
const numButtons = calculator.querySelectorAll('.num-button');
const opButtons = calculator.querySelectorAll('.op-button');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');
const decimalButton = document.querySelector('.op-decimal')
const calcDisplay = calculator.querySelector('.calculator-display');
const oldDisplay = calculator.querySelector('.old-display');
const keyArray  = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const opArray = [88, 187, 189, 191];
let opCheck = false;
let dataArray = [];
let calculationDone = false;
let isDown = false;

window.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (isDown == false) {
        if (keyArray.includes(event.keyCode)) {
            keyboardNum(event);
        } else if (opArray.includes(event.keyCode)) {
            keyboardOp(event);
        } else if (event.keyCode == 13) {
            equalsButton.classList.add('pressing')
            operate();
        } else if (event.keyCode == 190) {
            decimalButton.classList.add('pressing')
            decimalPlace();
        } else if (event.keyCode == 8) {
            delButton.classList.add('pressing')
            deleteLast();
        } else if (event.keyCode == 67) {
            clearButton.classList.add('pressing')
            clearCalc();
        }
    } else {
        return;
    }
    isDown = true;
})

window.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (keyArray.includes(event.keyCode)) {
        const numKey = document.querySelector(`.num-button[data-key="${event.keyCode}"]`);
        numKey.classList.remove('pressing-num')
    } else if (opArray.includes(event.keyCode)) {
        const opKey = document.querySelector(`.op-button[data-key="${event.keyCode}"]`);
        opKey.classList.remove('pressing');
    } else if (event.keyCode == 13) {
        equalsButton.classList.remove('pressing')
    } else if (event.keyCode == 190) {
        decimalButton.classList.remove('pressing')
    } else if (event.keyCode == 8) {
        delButton.classList.remove('pressing')
    } else if (event.keyCode == 67) {
        clearButton.classList.remove('pressing')
    }
    isDown = false;
})

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        const display = calcDisplay.innerText;
        if (display == 0) {
            calcDisplay.textContent = button.innerText;
        } else if (calculationDone == true) {
            calcDisplay.textContent = button.innerText;
            calculationDone = false;
        } else {
            if (calcDisplay.textContent.length < 11) {
            calcDisplay.textContent = display + button.innerText;
            } else {
                window.alert("Sorry this calculator only takes numbers up to 11 digits long")
            }
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
    decimalPlace();
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
    try{
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
    } catch(e) {
        null
    } 
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

function keyboardNum (e) {
    const numKey = document.querySelector(`.num-button[data-key="${e.keyCode}"]`);
    const display = calcDisplay.innerText;
    numKey.classList.add('pressing-num');
    try {
        if (display == 0) {
        calcDisplay.textContent = numKey.innerText;
    } else if (calculationDone == true) {
        calcDisplay.textContent = numKey.innerText;
        calculationDone = false;
    } else {
        if (calcDisplay.textContent.length < 11) {
            calcDisplay.textContent = (display + numKey.innerText);
        } else {
            window.alert("Sorry this calculator only takes numbers up to 11 digits long")
        }
        
    }
    opCheck = false;
    } catch(e) {
        null;
    }
}

function keyboardOp (e) {
    const opKey = document.querySelector(`.op-button[data-key="${e.keyCode}"]`);
    opKey.classList.add('pressing');
    try {
        if (!opCheck == true) {
            dataArray.push(calcDisplay.textContent);
            dataArray.push(opKey.textContent)
            oldDisplay.textContent += calcDisplay.textContent + ' ' + opKey.textContent + ' ';
            calcDisplay.textContent = '';
            calculationDone = false;
            opCheck = true;
        }
    } catch(e) {
        null;
    }   
}

function decimalPlace() {
    decimalButton.classList.add('pressing')
    if (!calcDisplay.textContent.includes('.')){
        calcDisplay.textContent = calcDisplay.innerText + decimalButton.innerText
    } else {
        return undefined;
    }
}