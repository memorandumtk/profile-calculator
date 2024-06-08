
/**
 * 項の符号を変換する関数
 * @param {} term 
 * @param {*} currentTerms 
 * @param {*} currentFormula 
 * @returns 
 */
function transferOperator(term, currentTerms, currentFormula){
    if (!term[term.length - 1].match(/\d/)) {
        return;
    }

    console.log('curentTerms', term)
    console.log('currentTerms', currentTerms)
    // 対象の項を取得する。+か-の記号に当たればその符号を切り替え。currentFormula用
    let temp = currentFormula.pop();
    while (currentFormula.length > 0) {
        if (currentFormula[currentFormula.length - 1].match(/[\+\-\*\/]/)) {
            if (currentFormula[currentFormula.length - 2].match(/[\+\-\*\/]/)) {
                temp = currentFormula.pop() + temp;
            }
            break;
        }
        temp = currentFormula.pop() + temp;
    }

    // tempをマイナス変換してcurrentFormulaに追加。tempが複数の数字を持つ場合を考慮し、joinで1文字に分割後、再度結合。
    temp = temp * -1;
    // 返還後の項をconcatenatedTempに格納し、currentFormulaに追加
    let concatenatedTemp = temp.toString().split("");
    if (currentFormula.length > 0 && currentFormula[currentFormula.length - 1].match(/\+/) && concatenatedTemp[0] === "-") {
        currentFormula.pop();
    } else if (currentFormula.length > 0 && currentFormula[currentFormula.length - 1].match(/\-/) && concatenatedTemp[0] === "-") {
        currentFormula[currentFormula.length - 1] = "+";
        concatenatedTemp.shift();
        // concatenatedTemp = concatenatedTemp.slice(1);
    } else if (currentFormula.length > 0 && currentFormula[currentFormula.length - 1].match(/[\*\/]/) && concatenatedTemp[0] === "+") {
        concatenatedTemp.shift();
    } else if (currentFormula.length > 0 && currentFormula[currentFormula.length - 1].match(/[\*\/]/) && concatenatedTemp[0] === "-") {
        concatenatedTemp.unshift('(');
        concatenatedTemp.push(')');
    }
    concatenatedTemp = concatenatedTemp.join("");
    currentFormula.push(concatenatedTemp);
    console.log('currentFormula After')
    console.log(currentFormula);
    // term = (concatenatedTemp[0] === "+") ? concatenatedTemp : "+" + concatenatedTemp;
    term = concatenatedTemp;
    currentTerms[currentTerms.length - 1] = term;

    return {term, currentTerms, currentFormula};
}

export { transferOperator };