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
const TRANSFER_OPERATOR = "+/-";

// グローバル変数
let currentInput = ""; // 入力された値を保持する変数（1文字）
let currentFormula = []; // 計算式を保持する変数: Array
let resultValue = ""; // 計算結果を保持する変数
let previeousResultValue = ""; // 直前の結果を保持する変数
let calculationHistory = []; // 計算履歴を保持する変数: Array
let counter = 0; // 計算履歴のカウンターで履歴のインデックスとしても使用する
let item = {}; // 計算式と答えと項の履歴を保持する変数: Object
let currentTerms = []; // 項の履歴を保持する変数: Array
let term = ""; // 項を保持する変数

// ノートに追加するリストを作成する関数
function addToNote () {
    let noteLi = document.createElement("li");
    if (resultValue === "ERROR") {

    } else if (resultValue === "") {
        noteLi.innerText = currentFormula.join("");
    } else if (resultValue) {
        noteLi.innerText = currentFormula.join("") + " = " + resultValue;
    }
    noteUl.appendChild(noteLi);
}

/**
 * 計算式と答え部分を更新する関数
 */
function updateDisplay() {
    formulaDiv.innerText = currentFormula.join("") || "0";
    resultDiv.innerText = resultValue;

    if (isWriteToNoteEnabled) {
        addToNote();
    }
}

// 項を構成する関数
function constructTerm(currentInput) {
    console.log(currentInput.match(/\d+/))
    if (currentInput.match(/\d/) && term.match(/-?[0-9]+/)) {
        term += currentInput;
    } else if (currentInput.match(/\d/) && term.match(/-?[0-9]+\./)) {
        term += currentInput;
        return;
    } else if (currentInput === ".") {
        term += currentInput;
        currentTerms.pop();
        return;
    } else if (currentInput === TRANSFER_OPERATOR && term.match(/-?[0-9]+/)) {
        currentTerms[currentTerms.length - 1] = term * -1;
        return;
    } else {
        term = currentInput;
    }
    currentTerms.push(term);
    return currentTerms;
}

// 履歴Arrayに計算式と答えが入ったJSONを格納する関数
function addToHistory(currentInput, result = "") {
    constructTerm(currentInput);

    if (currentInput === TRANSFER_OPERATOR || currentInput === EQUAL) {
    } else {
        currentFormula.push(currentInput);
    }

    item = { formula: currentFormula, terms: currentTerms, result: result };
    calculationHistory[counter] = item;
    console.log(...calculationHistory)
}

// 履歴Arrayをリセットする関数
function resetHistory() {
    calculationHistory = [];
    noteUl.innerHTML = "";
}


// ACボタンが押された場合の処理
function handleAllClear() {
    currentFormula = [];
    currentTerms = [];
    resultValue = "";
    updateDisplay();
    addToHistory({ formula: "Cleared" });
}

// Cボタンが押された場合の処理
function handleClear() {
    currentFormula.pop();
    currentTerms[currentTerms.length - 1].length > 1 ? currentTerms[currentTerms.length - 1].slice(0, -1) : currentTerms.pop();
    updateDisplay();
}

// =ボタンが押された場合の処理
function handleEqual(currentInputEqualSign) {
    try {
        resultValue = eval(currentTerms.join("")); // Consider a safer math library for production
        addToHistory(currentInputEqualSign, resultValue);
    } catch (error) {
        console.log(error);
        resultValue = "ERROR";
    }

    previeousResultValue = resultValue; // Set new input after calculation
    updateDisplay();
    resultValue = "";
    currentFormula = [];
    currentTerms = [];
    counter++;
}


// 演算子が押された場合の処理
function handleOperators(currentInputOperator) {
    // ×記号と÷記号を*と/に変換、計算のため
    if (currentInputOperator === "÷") {
        currentInputOperator = "/";
    } else if (currentInputOperator === "×") {
        currentInputOperator = "*";
    }

    if (currentFormula === "" && previeousResultValue === "") {
        return;
    }

    if (currentFormula === "" && previeousResultValue) {
        currentFormula = previeousResultValue;
    }

    if (currentFormula) { // Guard against currentInputOperator at the beginning
        addToHistory(currentInputOperator);
    }
    updateDisplay();
}

// 小数点が押された場合の処理
function handleDecimalPoint(currentInputDecimalPoint) {
    if (term.indexOf(currentInputDecimalPoint) === -1) {
        addToHistory(currentInputDecimalPoint);
        updateDisplay();
    }
}

// +-切り替えボタンが押された場合の処理
function handleTransferOperator(currentInputTransferOperator) {
    addToHistory(currentInputTransferOperator);
    updateDisplay();
}

// 数字が押された場合の処理
function handleNumbers(currentInputNumber) {
    if (resultValue && !previeousResultValue) { // 計算式が残っていたらリセットする
        resultValue = "";
    }
    addToHistory(currentInputNumber);
    updateDisplay();
    previeousResultValue = "";
}

// 押されたボタンによって処理を分岐
function handleButtonClick(buttonText) {
    currentInput = buttonText;
    if (currentInput === ALL_CLEAR) {
        handleAllClear();
    } else if (currentInput === CLEAR) {
        handleClear();
    } else if (currentInput === EQUAL) {
        handleEqual(currentInput);
    } else if (OPERATORS.includes(currentInput)) {
        handleOperators(currentInput);
    } else if (currentInput === DECIMAL_POINT) {
        handleDecimalPoint(currentInput);
    } else if (currentInput === TRANSFER_OPERATOR) {
        handleTransferOperator(currentInput);
    } else if (currentInput.match(/[0-9]/)){ // 数字が押された場合
        handleNumbers(currentInput);
    }
    
}


// 計算機のボタンにEvent Listenerを付ける
document.querySelectorAll("#calculator-btns .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button.innerText);
    });
});

export { handleButtonClick, updateDisplay, resetHistory };