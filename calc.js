class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    appendNumber(number) {
        this.currentOperand += `${number}`
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = this.previousOperand
        }
    }
}


const numbersButton = document.querySelectorAll(".numbers");
const operationButton = document.querySelectorAll(".operation");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".cleaner");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numbersButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})