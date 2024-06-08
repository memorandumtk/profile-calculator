import { isWriteToNoteEnabled, handleNoteClear } from "./note.js";
import { transferOperator } from "./utils/transferOperator.js";
import { addToHistory } from "./utils/addToHistory.js";
import { constructTerm } from "./utils/constructTerm.js";

let formulaInput = document.getElementById("formula"); // button element
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
let calculationHistory = []; // 表示用の計算式を保持する変数: Array
let counter = 0; // 計算履歴のカウンターで履歴のインデックスとしても使用する
let currentTerms = []; // 項の履歴を保持する変数。答えを求める値として使用: Array
let term = ""; // 項を保持する変数

/**
 * ノートに追加するリストを作成する関数
 */
function reflectToNote() {
    noteUl.innerHTML = ""; // ノートのリストをリセット
    for (let calculationList of calculationHistory) {
        if (!calculationList) {
            continue;
        }
        let noteLi = document.createElement("li");
        if (calculationList.result === "") {
            noteLi.innerText = calculationList.formula.join("");
        } else {
            noteLi.innerText = calculationList.formula.join("") + " = " + calculationList.result;
        }
        noteLi.addEventListener("click", (e) => {
            resultValue = calculationList.result.toString();
            currentInput = calculationList.result.toString();
            term = calculationList.result.toString();
            counter++;
            ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInput, resultValue));
            updateDisplay();
        });
        noteUl.appendChild(noteLi);
    }
}

/**
 * 計算式と答え部分を更新する関数
 * @param {Boolean} answer
 */
function updateDisplay(answer = false) {
    formulaInput.textContent = "";
    if (answer) {
        formulaInput.textContent = resultValue;
    } else {
        formulaInput.textContent = currentFormula.join("") || "0";
    }
    // ノート書き込みが有効の場合は、ノートに反映
    if (isWriteToNoteEnabled) {
        reflectToNote();
    }
}

/**
 * 履歴Arrayをリセットする関数
 */
function resetHistory() {
    calculationHistory = [];
    noteUl.innerHTML = "";
    updateDisplay();
    counter = 0;
}


/**
 * ACボタンが押された場合の処理
 */
function handleAllClear() {
    // 計算履歴Arrayのresultが空の場合（一回目の計算が行われていない場合）はすべてリセット。
    if (calculationHistory[0].result === "") {
        currentTerms = [];
        currentFormula = [];
        resetHistory();
        return;
    }
    calculationHistory.pop(); // 直前の計算履歴を削除
    currentFormula = [];
    currentTerms = [];
    resultValue = "";
    updateDisplay();
}

/**
 * Cボタンが押された場合の処理
 */
function handleClear() {
    currentFormula.pop(); // 直前の文字を削除
    // 直前の項の最後の文字を削除。
    const trimmedTerm = currentTerms[currentTerms.length - 1].slice(0, -1);
    currentTerms[currentTerms.length - 1] = trimmedTerm;
    updateDisplay();
}

/**
 * =ボタンが押された場合の処理
 * @param {String} currentInputEqualSign
 */
function handleEqual(currentInputEqualSign) {
    try {
        resultValue = eval(currentTerms.join("")); // evalはリスク有りのため、後で修正する必要があるかも
        ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputEqualSign, resultValue));
    } catch (error) {
        console.log(error);
        resultValue = "ERROR";
    }
    updateDisplay(true);
    previeousResultValue = resultValue; // 答えを直前の答えとして設定
    // 各変数をリセット
    resultValue = "";
    currentFormula = [];
    currentTerms = [];
    term = "";
    counter++;
}


/**
 * 演算子が押された場合の処理
 * @param {String} currentInputOperator
 */
function handleOperators(currentInputOperator) {
    // ×記号と÷記号を*と/に変換、計算のため
    if (currentInputOperator === "÷") {
        currentInputOperator = "/";
    } else if (currentInputOperator === "×") {
        currentInputOperator = "*";
    }
    // 計算式が空で、且つ直前の結果が空の場合
    if (currentFormula.length === 0 && previeousResultValue === "") {
        return;
    }
    // 計算式が空で、直前の結果がある場合は直前の結果を計算式に追加
    if (currentFormula.length === 0 && previeousResultValue !== "") {
        console.log(previeousResultValue);
        currentFormula.push(previeousResultValue);
        term = previeousResultValue;
        currentTerms.push(term);
        ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputOperator));
        return;
    }
    // 計算式が空でないことを確認
    if (currentFormula) {
        ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputOperator));
    }
    updateDisplay();
}

/**
 * 小数点が押された場合の処理
 * @param {String} currentInputDecimalPoint
 */
function handleDecimalPoint(currentInputDecimalPoint) {
    if (term.indexOf(currentInputDecimalPoint) === -1) {
        ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputDecimalPoint));
        updateDisplay();
    }
}

/**
 * +-切り替えボタンが押された場合の処理
 * @param {String} currentInputTransferOperator
 */
function handleTransferOperator(currentInputTransferOperator) {
    if (currentTerms.length === 0) {
        return;
    }
    ({term, currentTerms, currentFormula} = transferOperator(term, currentTerms, currentFormula));
    ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputTransferOperator));
    updateDisplay();
}

/**
 * 数字が押された場合の処理
 * @param {String} currentInputNumber
 */
function handleNumbers(currentInputNumber) {
    if (resultValue && previeousResultValue !== "") { // 計算式が残っていたらリセットする
        resultValue = "";
    }
    ({term, currentTerms, currentFormula, calculationHistory, counter} = addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInputNumber));
    updateDisplay();
    previeousResultValue = ""; // 直前の式をリセット
}

/**
 * 押されたボタンによって処理を分岐させるHandler関数
 * @param {String} buttonText
 */
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
    } else if (currentInput.match(/\d/)) { // 数字が押された場合
        handleNumbers(currentInput);
    }

}

/**
 * 計算機のボタンにEvent Listenerを付ける
 */
document.querySelectorAll("#calculator-btns-div .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button.innerText);
    });
});

/**
 * キーボードから数字が入力された場合の処理
 * * formulaInputにフォーカスがある場合のみ処理を行う
 */
document.addEventListener("keydown", (event) => {
    if (document.activeElement === formulaInput) {
        switch (event.key) {
            case "+":
                handleOperators("+");
                break;
            case "-":
                handleOperators("-");
                break;
            case "*":
                handleOperators("×");
                break;
            case "/":
                handleOperators("÷");
                break;
            case ".":
                handleDecimalPoint(DECIMAL_POINT);
                break;
            case "Enter":
                handleEqual(EQUAL);
                break;
            case "Backspace":
                handleClear();
                break;
            default:
                if (event.key.match(/\d/)) {
                    handleNumbers(event.key);
                }
                break;
        }
    }
});

// export
export { handleButtonClick, updateDisplay, resetHistory };