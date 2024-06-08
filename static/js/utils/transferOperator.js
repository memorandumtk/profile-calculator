import { createLastTerm } from "./createLastTerm.js";

/**
 * 項の符号を変換する関数
 * @param {*} currentFormula 
 */
function transferOperator(currentFormula) {

    let temp = createLastTerm(currentFormula);

    console.log('temp from transferOperator: ', temp)
    console.log('current formula from transferOperator: ', currentFormula)
    // 変換後の項に格納し、currentFormulaに追加
    if (currentFormula[currentFormula.length - 1].match(/[\*\/]/) && temp[0] === "-"){
        temp.shift();
    } else if (currentFormula[currentFormula.length - 1].match(/[\*\/]/)){
        temp.unshift("-");
    } else if (temp[0] === "+") {
        temp[0] = "-";
    } else if (temp[0] === "-") {
        temp[0] = "+";
    }

    let term = temp.join("");

    temp.map((t) => currentFormula.push(t));

    console.log('current formula from transferOperator: ', currentFormula)
    return { currentFormula };
}

export { transferOperator };