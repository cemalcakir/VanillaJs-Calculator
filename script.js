const display = document.getElementById("displayNumber");
let firstNumber = "";
let operator = "";
let secondNumber = "";


// NUMBERS
const operands = [...document.getElementsByClassName("operand")];
for (const op of operands) {
    op.addEventListener("click", displayNumber);
};

function displayNumber(e) {
    const value = e.target.innerText;
    if (value === "." && firstNumber.includes(".")) {
        return;
    }
    if ((value === "0" || value === "00" ) && firstNumber === "0") {
        return;
    }
    if (value === "00" && firstNumber === "") {
        displayHelper(0);
        return;
    }
    displayHelper(value);
};

function displayHelper(value) {
    firstNumber = `${firstNumber}${value}`
    display.innerText = firstNumber;
}

// OPERATORS
const operators = [...document.getElementsByClassName("operator")];
for (const op of operators) {
    op.addEventListener("click", operate);
};

function operate(e) {
    if (firstNumber && secondNumber) {
        calculate();
        display.innerText = firstNumber;
    } 
    if (firstNumber !== "") {
        secondNumber = firstNumber;
        firstNumber = "";
    };
    operator = e.target.innerText;
};

function calculate() {
    switch (operator) {
        case "+":
            firstNumber = Number.parseFloat(secondNumber) + Number.parseFloat(firstNumber); 
            break;
        case "-":
            firstNumber = Number.parseFloat(secondNumber) - Number.parseFloat(firstNumber); 
            break;
        case "*":
            firstNumber = Number.parseFloat(secondNumber) * Number.parseFloat(firstNumber); 
            break;
        case "/":
            firstNumber = Number.parseFloat(secondNumber) / Number.parseFloat(firstNumber); 
            break;
        default:
            break;
    };
};

// OPTIONS
const acButton = document.getElementById("ac");
acButton.addEventListener("click", () => {
    display.innerText = "";
    firstNumber = "";
    secondNumber = "";
});

const delButton = document.getElementById("del");
delButton.addEventListener("click", () => {
    if (firstNumber !== "") {
        firstNumber = firstNumber.substring(0, firstNumber.length - 1);
        display.innerText = firstNumber;
    } else if (secondNumber !== "") {
        secondNumber = secondNumber.toString();
        firstNumber = secondNumber.substring(0, secondNumber.length - 1);
        secondNumber = "";
        display.innerText = firstNumber;
    }
});

const reverseButton = document.getElementById("reverse");
reverseButton.addEventListener("click", () => {
    if (firstNumber !== "") {
        if (firstNumber.startsWith("-")) {
            firstNumber = firstNumber.substring(1, firstNumber.length);
            display.innerText = firstNumber;
        } else {
            firstNumber = `-${firstNumber}`;
            display.innerText = firstNumber;
        }
    } else if (secondNumber !== "") {
        secondNumber = secondNumber.toString();
        if (secondNumber.startsWith("-")) {
            firstNumber = secondNumber.substring(1, secondNumber.length);
            secondNumber = "";
            display.innerText = firstNumber;
        } else {
            firstNumber = `-${secondNumber}`;
            secondNumber = "";
            display.innerText = firstNumber;
        }
    } else {
        firstNumber = "-";
        display.innerText = firstNumber;
    }
});