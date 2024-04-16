import { isWriteToNoteEnabled } from "./note.js";
let formulaDiv = document.getElementById("formula");
let resultDiv = document.getElementById("result");
let noteUl = document.getElementById("note-ul");

// 定数
const OPERATORS = ["÷", "×", "+", "-", "%"];
const DECIMAL_POINT = ".";
const EQUAL = "=";
const ALL_CLEAR = "AC";
const CLEAR = "C";

// グローバル変数
let currentInput = "";
let resultValue = "";
let previeousInput = "";
let calculationHistory = [];
let counter = 0;

// 計算式と答え部分を更新する関数
function updateDisplay() {
    formulaDiv.innerText = currentInput || "0";
    resultDiv.innerText = resultValue;
}

// ノートに追加するリストを作成する関数
function addToNote (item) {
    let noteLi = document.createElement("li");
    noteLi.innerText = item.formula + " = " + item.result;
    noteUl.appendChild(noteLi);
}

// 履歴Arrayに計算式と答えが入ったJSONを格納する関数
function addToHistory(item) {
    calculationHistory[counter] = item;
    if (isWriteToNoteEnabled) {
        addToNote(item);
    }
}

// 履歴Arrayをリセットする関数
function resetHistory() {
    calculationHistory = [];
    noteUl.innerHTML = "";
}


// ACボタンが押された場合の処理
function handleAllClear() {
    currentInput = "";
    resultValue = "";
    updateDisplay();
    addToHistory({ formula: "Cleared" });
}

// Cボタンが押された場合の処理
function handleClear() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// =ボタンが押された場合の処理
function handleEqual() {
    try {
        resultValue = eval(currentInput); // Consider a safer math library for production
        addToHistory({ formula: currentInput, result: resultValue });
    } catch (error) {
        console.log(error);
        resultValue = "ERROR";
    }
    previeousInput = resultValue; // Set new input after calculation
    console.log(resultValue)
    updateDisplay();
    resultValue = "";
    currentInput = "";
    counter++;
}

// 演算子が押された場合の処理
function handleOperators(operator) {
    // ×記号と÷記号を*と/に変換
    if (operator === "÷") {
        operator = "/";
    } else if (operator === "×") {
        operator = "*";
    }
    if (currentInput === "" && operator === "-" && previeousInput === "") {
        currentInput += operator;
        updateDisplay();
        return;
    }
    if (currentInput === "" && previeousInput === "") {
        return;
    }
    if (currentInput === "" && previeousInput) {
        currentInput = previeousInput;
    }
    if (currentInput) { // Guard against operator at the beginning
        currentInput += operator;
        addToHistory({ formula: currentInput });
    }
    updateDisplay();
}

// 小数点が押された場合の処理
function handleDecimalPoint() {
    if (currentInput.indexOf(DECIMAL_POINT) === -1) {
        currentInput += DECIMAL_POINT;
        updateDisplay();
    }
}

// 数字が押された場合の処理
function handleNumbers(number) {
    if (resultValue && !previeousInput) { // 計算式が残っていたらリセットする
        currentInput = "";
        resultValue = "";
        updateDisplay();
    }
    currentInput += number;
    updateDisplay();
    previeousInput = "";
}

// 押されたボタンによって処理を分岐
function handleButtonClick(buttonText) {
    if (buttonText === ALL_CLEAR) {
        handleAllClear();
    } else if (buttonText === CLEAR) {
        handleClear();
    } else if (buttonText === EQUAL) {
        handleEqual();
    } else if (OPERATORS.includes(buttonText)) {
        handleOperators(buttonText);
    } else if (buttonText === DECIMAL_POINT) {
        handleDecimalPoint();
    } else {
        // 数字が押された場合
        handleNumbers(buttonText);
    }

    console.log(currentInput)
    console.log(calculationHistory)
}


// 計算機のボタンにEvent Listenerを付ける
document.querySelectorAll("#calculator-btns .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button.innerText);
    });
});

export { handleButtonClick, updateDisplay, resetHistory };