
// 定数
const OPERATORS = ["÷", "×", "+", "-", "%"];
const DECIMAL_POINT = ".";
const EQUAL = "=";
const ALL_CLEAR = "AC";
const CLEAR = "C";
const TRANSFER_OPERATOR = "+/-";

/**
 * important function
 * 履歴Arrayに計算式と答えが入ったJSONを格納する関数
 * @param {Array} currentFormula
 * @param {Array} calculationHistory
 * @param {Array} counter
 * @param {String} currentInput
 * @param {String} result
 */
function addToHistory(currentFormula, calculationHistory, counter, currentInput, result = "") {
    // 入力された値が`+/-か=以外の場合はそのまま追加
    if (!(currentInput === TRANSFER_OPERATOR || currentInput === EQUAL)) {
        currentFormula.push(currentInput);
    }

    const stringifiedCurrentFormula = currentFormula.join("");

    // 履歴に挿入するJSONを作成
    let item = { formula: currentFormula, stringifiedCurrentFormula: stringifiedCurrentFormula, result: result };
    // counterをインデックスとして使用することで、履歴を保持しノートから再度表示・使用できるようにする
    calculationHistory[counter] = item;
    console.log(calculationHistory)
    console.log('counter', " " + counter)
    console.log('currentFormula', currentFormula)
    console.log('history', calculationHistory)
    return {currentFormula, calculationHistory, counter};
}

export { addToHistory };