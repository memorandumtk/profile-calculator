import { constructTerm } from "./constructTerm.js";

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
 * @param {String} term
 * @param {Array} currentTerms
 * @param {Array} currentFormula
 * @param {Array} calculationHistory
 * @param {Array} counter
 * @param {String} currentInput
 * @param {String} result
 */
function addToHistory(term, currentTerms, currentFormula, calculationHistory, counter, currentInput, result = "") {
    // 入力された値が`+/-か=以外の場合はそのまま追加
    if (!(currentInput === TRANSFER_OPERATOR || currentInput === EQUAL)) {
        let constracted = constructTerm(term, currentTerms, currentInput);
        term = constracted.term;
        currentTerms = constracted.currentTerms;
        console.log('term from addToHistory: ', term)
        currentFormula.push(currentInput);
    } else if (currentInput === TRANSFER_OPERATOR) {
        currentTerms[currentTerms.length - 1] = term;
    }

    // 履歴に挿入するJSONを作成
    let item = { formula: currentFormula, terms: currentTerms, result: result };
    // counterをインデックスとして使用することで、履歴を保持しノートから再度表示・使用できるようにする
    calculationHistory[counter] = item;
    console.log(calculationHistory)
    console.log('term and counter', term + " " + counter)
    console.log('currentFormula', currentFormula)
    console.log('currentTerms', currentTerms)
    console.log('history', calculationHistory)
    return {term, currentTerms, currentFormula, calculationHistory, counter};
}

export { addToHistory };