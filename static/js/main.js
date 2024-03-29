let formula = document.getElementById("formula");
let result = document.getElementById("result");
let buttons = Array.from(document.getElementsByClassName("btn"));
let numbers = Array.from(document.querySelectorAll(".num"));
let note = document.getElementById("note");

let formulaValue = ""; // 計算式の値
let resultValue = ""; // 答えの値
let isFirstFormula = true; // 最初の計算式かどうかのBoolean値
let isFirstString = true; // 最初の計算式かどうかのBoolean値

// ボタンの値の定数
const OPERATORS = ["/", "*", "+", "-", "%"];
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
    note.value += "Cleared\n"; // Note that the calculator was cleared
}

const EqualButtonIsClicked = () => {
    console.log('EqualButtonIsClicked')
    try {
        isFirstFormula = false;
        resultValue = eval(formulaValue);
        result.innerText = resultValue;
        formulaValue = resultValue;
        numbers.map((numEle) => {
            numEle.disabled = true;
        });
        note.value += ` = ${resultValue}\n`; // Noteに計算結果を追加、イコールサインと改行を含め。
    } catch {
        result.innerText = "ERROR.";
        resultValue = "";
        formulaValue = "";
        note.value += "Error\n"; // Note an error occurred
    }
}

const OperatorButtonIsClicked = (enteredButtonText) => {
    console.log('OperatorButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
}

const DecimalPointButtonIsClicked = (enteredButtonText) => {
    console.log('DecimalPointButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
}

const NumberButtonIsClicked = (enteredButtonText) => {
    console.log('NumberButtonIsClicked')
    formulaValue += enteredButtonText;
    formula.innerText = formulaValue;
    note.value = formulaValue; // Noteに計算式を追加
}
const ButtonIsClicked = (enteredButtonText) => {
    console.log(`isFirstFormula? ${isFirstFormula}`)
    console.log(`isFirstString? ${isFirstString}`)

    if (enteredButtonText === ALL_CLEAR) {
        // All-Clearボタンが押された場合
        ACButtonIsClicked();
    } else if (enteredButtonText === EQUAL) {
        // Equalボタンが押された場合
        if (isFirstString) {
        } else if (!isFirstString){
            EqualButtonIsClicked();
        }
    } else if (OPERATORS.includes(enteredButtonText)) {
        // 演算子ボタンが押された場合
        if (isFirstString) {
        } else if (!isFirstString){
            OperatorButtonIsClicked(enteredButtonText);
        }
    } else if (enteredButtonText === DECIMAL_POINT) {
        // 演算子ボタンが押された場合
        if (isFirstString) {
        } else if (!isFirstString){
            DecimalPointButtonIsClicked(enteredButtonText);
        }
    } else {
        // 数字ボタンが押された場合
        NumberButtonIsClicked(enteredButtonText, isFirstFormula);
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
