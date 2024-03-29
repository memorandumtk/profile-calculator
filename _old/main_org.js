let formula = document.getElementById("formula");
let result = document.getElementById("result");
let buttons = Array.from(document.getElementsByClassName("btn"));
let numbers = Array.from(document.querySelectorAll(".num"));
let note = document.getElementById("note");

let formulaValue = ""; // 計算式の値
let resultValue = ""; // 答えの値
let isFirstFormula = true; // 最初の計算式かどうかのBoolean値

buttons.map((button) => {
    button.addEventListener("click", (e) => {
        const enteredButtonText = e.target.innerText;

        console.log(`isFirstFormula? ${isFirstFormula}`)
        // 最初の計算式の場合
        if (isFirstFormula) {
            formula.innerText = "0";
            resultValue = "";
            result.innerText = resultValue;
        } else if (!isFirstFormula) { // 2回目以降の計算式の場合
            formula.innerText = formulaValue;
            resultValue = "";
            result.innerText = resultValue;
            if ( // 演算子ボタンが押された場合
                enteredButtonText !== "/" ||
                enteredButtonText !== "*" ||
                enteredButtonText !== "+" ||
                enteredButtonText !== "-"
            ) {
                numbers.map((numEle) => { // 数字ボタンを有効化
                    numEle.disabled = false;
                });
            }
        }

        // All-Clearボタンが押された場合
        if (enteredButtonText === "AC") {
            formula.innerText = "0";
            formulaValue = "";
            resultValue = "";
            result.innerText = resultValue;
            note.value += "Cleared\n"; // Note that the calculator was cleared
        } else if (enteredButtonText === "=") { // Equalボタンが押された場合
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
        } else { // 数字ボタンが押された場合
            formulaValue += enteredButtonText;
            formula.innerText = formulaValue;
            note.value = formulaValue; // Noteに計算式を追加
        }

        console.log(formulaValue);
        console.log(resultValue)
    });
})
;
