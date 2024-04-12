let formula = document.getElementById("formula");
let result = document.getElementById("result");
let buttons = Array.from(document.getElementsByClassName("btn"));
let numbers = Array.from(document.querySelectorAll(".num"));
let note = document.getElementById("note");

let formulaValue = ""; // 計算式の値
let resultValue = ""; // 答えの値
let isFirstFormula = true; // Boolean: 最初の計算式かどうか
let isFirstString = true; // Boolean: 最初の計算式かどうか
let historyOfFormula = []; // Array: 計算式の履歴
//[0: {formula: "1+2", result: "3"}, 1: {formula: "3+4", result: "7"}..]

// ボタンの値の定数
const OPERATORS = ["÷", "×", "+", "-", "%"];
const DECIMAL_POINT = ".";
const EQUAL = "=";
const ALL_CLEAR = "AC";
const CLEAR = "C";

const ACButtonIsClicked = () => {
    console.log('ACButtonIsClicked')
    formula.innerText = "0";
    formulaValue = "";
    resultValue = "";
    result.innerText = resultValue;
    note.value += "Cleared\n";
    isFirstString = true;
    isFirstFormula = true;
}

const EqualButtonIsClicked = () => {
    console.log('EqualButtonIsClicked')
    try {
        resultValue = eval(formulaValue);
        result.innerText = resultValue;
        formulaValue = resultValue;
        // numbers.map((numEle) => {
        //     numEle.disabled = true;
        // });
        note.value += ` = ${resultValue}\n`; // Noteに計算結果を追加、イコールサインと改行を含め。
    } catch {
        result.innerText = "ERROR.";
        resultValue = "";
        formulaValue = "";
        note.value += "Error\n";
    }
    isFirstFormula = false;
    isFirstString = true;
}

const OperatorButtonIsClicked = (enteredButtonText) => {
    console.log('OperatorButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
    isFirstString = false;
}

const DecimalPointButtonIsClicked = (enteredButtonText) => {
    console.log('DecimalPointButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
    isFirstString = false;
}

const NumberButtonIsClicked = (enteredButtonText) => {
    console.log('NumberButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
    isFirstString = false;
}

const ButtonIsClicked = (enteredButtonText) => {
    console.log(`isFirstFormula? ${isFirstFormula}`)
    console.log(`isFirstString? ${isFirstString}`)

    if (enteredButtonText === ALL_CLEAR) {
        // All-Clearボタンが押された場合の処理
        ACButtonIsClicked();
    } else if (enteredButtonText === EQUAL) {
        // Equalボタンが押された場合の処理
        if (isFirstString) {
        } else if (!isFirstString) {
            EqualButtonIsClicked();
        }
    } else if (OPERATORS.includes(enteredButtonText)) {
        // 演算子ボタンが押された場合の処理
        if (isFirstString && !isFirstFormula) {
            OperatorButtonIsClicked(enteredButtonText);
        } else if (!isFirstString) {
            OperatorButtonIsClicked(enteredButtonText);
        }
    } else if (enteredButtonText === DECIMAL_POINT) {
        // 演算子ボタンが押された場合の処理
        if (isFirstString) {
        } else if (!isFirstString) {
            DecimalPointButtonIsClicked(enteredButtonText);
        }
    } else {
        // 数字ボタンが押された場合の処理
        if (isFirstString && isFirstFormula) {
            NumberButtonIsClicked(enteredButtonText);
        } else if (!isFirstString) {
            NumberButtonIsClicked(enteredButtonText);
        }
    }

    console.log(formulaValue);
    console.log(resultValue)
}

// すべてのボタンにイベントリスナーを追加
buttons.map((button) => {
    button.addEventListener("click", (e) => {
        const enteredButtonText = e.target.innerText;
        ButtonIsClicked(enteredButtonText);
    });
})
;
