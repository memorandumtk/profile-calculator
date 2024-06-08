
/**
 * important function
 * 項を構成する関数
 * @param {String} term
 * @param {Array} currentTerms
 * @param {String} currentInput
 */
function constructTerm(term, currentTerms, currentInput) {

    // 数字かつ直前の項が数字の場合は、項に数字を追加。または、直前の項が+か-の場合は、項に数字を追加
    if (term.match(/-?\d+/) && currentInput.match(/\d+/) ||
        (term.match(/[\+\-]/) && currentInput.match(/\d+/))) {
        let temp = currentTerms.length > 0 ? currentTerms.pop() : "";
        term = temp + currentInput;

        // 数字かつ直前の項が小数点を含む数字の場合は、項に数字を追加
    } else if (term.match(/-?\d+\./) && currentInput.match(/\d+/)) {
        term += currentInput;
        return;

        // 数字かつ直前の項が小数点を含む数字の場合は、項に数字を追加し、currentTermsから直前の数字を削除
    } else if (currentInput === ".") {
        term += currentInput;
        currentTerms.pop();
        currentTerms.push(term);
        return;
    } else {
        term = currentInput;
    }
    currentTerms.push(term);

    console.log('term from constructTerm: ', term)
    return {term, currentTerms};
}

export { constructTerm };