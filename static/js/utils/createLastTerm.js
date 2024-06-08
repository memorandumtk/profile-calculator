/**
 * 最後の項を式から作成する。
 * @param {Array} currentFormula 
 * @param {Array} temp
 */

function createLastTerm(currentFormula) {

    // 対象の項を取得する。+か-の記号に当たればその符号を切り替え
    let temp = [];

    while (currentFormula.length > 0) {
        if (currentFormula[currentFormula.length - 1].match(/[\+\-]/)) {
            temp.unshift(currentFormula.pop());
            break;
        } else if (currentFormula[currentFormula.length - 1].match(/[\*\/]/)) {
            break;
        } else {
            temp.unshift(currentFormula.pop());
        }
    }

    return temp;
}

export { createLastTerm };