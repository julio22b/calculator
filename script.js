function add(a, b) {
    return +a + +b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return substract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

let toDisplay = document.querySelector('.display');
let para = document.querySelector('.para');

let values = {
    value1: '',
    operator: '',
    value2: '',
};

const numberBtns = document.getElementsByClassName('number');

//add events that will update display with NUMBER buttons

for (let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].addEventListener('click', (e) => {
        if (values.operator) {
            toDisplay.textContent += `${e.target.getAttribute('value')}`;
            return (values.value2 += e.target.getAttribute('value'));
        } else if (!values.operator) {
            toDisplay.textContent += `${e.target.getAttribute('value')}`;
            return (values.value1 += e.target.getAttribute('value'));
        } else if (values.value1 && values.operator && values.value2) {
            toDisplay.textContent = `${operate(values.operator, values.value1, values.value2)}`;
            values.value1 = `${operate(
                values.operator,
                parseInt(values.value1),
                parseInt(values.value2),
            )}`;
            values.value2 = '';
        }
    });
}

//add events that will update display with OPERATOR buttons

const operatorBtns = document.getElementsByClassName('operator');

for (let i = 0; i < operatorBtns.length; i++) {
    operatorBtns[i].addEventListener('click', (e) => {
        if (!toDisplay.textContent.includes(' ')) {
            toDisplay.textContent += ` ${e.target.getAttribute('value')} `;
            return (values.operator = e.target.getAttribute('value')), console.log(values);
        } else if (values.operator) {
            if (values.value1 && values.operator && values.value2) {
                para.textContent = `${values.value1} ${values.operator} ${values.value2}`;
                toDisplay.textContent = `${operate(values.operator, values.value1, values.value2)}`;
                return (
                    (values.value1 = `${operate(
                        values.operator,
                        parseFloat(values.value1),
                        parseFloat(values.value2),
                    )}`),
                    (values.operator = e.target.getAttribute('value')),
                    (values.value2 = ''),
                    (toDisplay.textContent = `${values.value1} ${e.target.getAttribute('value')} `)
                );
            } else {
                toDisplay.textContent = `${values.value1} ${e.target.getAttribute('value')} `;
                return (
                    (values.operator = e.target.getAttribute('value')),
                    console.log(values),
                    (values.value2 = '')
                );
            }
        }
    });
}

// equality button

const equalBtn = document.querySelector('.equal');
equalBtn.addEventListener('click', function _updateValues() {
    if (values.value2 == 0 && values.operator === '/') {
        (values.value1 = ''),
            (values.operator = ''),
            (values.value2 = ''),
            (toDisplay.textContent = '');
        return alert(`I'm just a cheap calculator.`);
    } else if (!values.value1 || !values.operator || !values.value2) {
        return; //if any of the values doesn't exist then the button doesn't do anything
    } else {
        para.textContent = `${values.value1} ${values.operator} ${values.value2}`;
        toDisplay.textContent = `${operate(values.operator, values.value1, values.value2).toFixed(
            1,
        )}`;
        values.value1 = `${operate(
            values.operator,
            parseFloat(values.value1),
            parseFloat(values.value2),
        ).toFixed(1)}`;
        values.operator = '';
        values.value2 = '';
        console.log(values);
    }
});

// dot button. Adds dot to 1st value if !2nd or adds dot to 2nd value if both exist.

const dotBtn = document.querySelector('.dot');
dotBtn.addEventListener('click', (e) => {
    if (values.value1 && !values.value2) {
        if (values.value1.includes('.')) {
            return;
        } else {
            toDisplay.textContent += '.';
            values.value1 += '.';
        }
    } else if (values.value1 && values.value2) {
        if (values.value2.includes('.')) {
            return;
        } else {
            toDisplay.textContent += '.';

            values.value2 += '.';
        }
    }
});

// all clear button resets values and display

const allClearBtn = document.querySelector('.all-clear');
allClearBtn.addEventListener('click', (e) => {
    toDisplay.textContent = '';
    values = {
        value1: '',
        operator: '',
        value2: '',
    };
    para.textContent = '';
});

// clear button

const clearBtn = document.querySelector('.delete');
clearBtn.addEventListener('click', (e) => {
    if (values.value1 && !values.operator && !values.value2) {
        return (
            (toDisplay.textContent = `${values.value1.slice(0, -1)}`),
            (values.value1 = `${values.value1.slice(0, -1)}`)
        );
    } else if (values.value1 && values.operator && !values.value2) {
        return (toDisplay.textContent = `${values.value1}`), (values.operator = '');
    } else if (values.value1 && values.operator && values.value2) {
        return (
            (toDisplay.textContent = `${values.value1} ${values.operator} ${values.value2.slice(
                0,
                -1,
            )}`),
            (values.value2 = `${values.value2.slice(0, -1)}`)
        );
    }
});

const sortedNumberBtns = Array.from(numberBtns).sort((a, b) => a.value - b.value);
console.log(operatorBtns);
document.addEventListener('keydown', (e) => {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 96:
            sortedNumberBtns[0].click();
            break;
        case 97:
            sortedNumberBtns[1].click();
            break;
        case 98:
            sortedNumberBtns[2].click();
            break;
        case 99:
            sortedNumberBtns[3].click();
            break;
        case 100:
            sortedNumberBtns[4].click();
            break;
        case 101:
            sortedNumberBtns[5].click();
            break;
        case 102:
            sortedNumberBtns[6].click();
            break;
        case 103:
            sortedNumberBtns[7].click();
            break;
        case 104:
            sortedNumberBtns[8].click();
            break;
        case 105:
            sortedNumberBtns[9].click();
            break;
        case 8:
            clearBtn.click();
            break;
        case 13:
            equalBtn.click();
            break;
        case 111:
            operatorBtns[0].click();
            break;
        case 106:
            operatorBtns[1].click();
            break;
        case 109:
            operatorBtns[2].click();
            break;
        case 107:
            operatorBtns[3].click();
            break;
        default:
            break;
    }
});
