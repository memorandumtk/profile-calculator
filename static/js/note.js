import { resetHistory } from "./calculate.js";

let writeToNoteButton = document.querySelector("#write-to-note");
let isWriteToNoteEnabled = true;
let noteOutputEnableIcon = document.querySelector(".fa-toggle-on");
let noteOutputDisableIcon = document.querySelector(".fa-toggle-off");

const NOTE_CLEAR = "Note Clear";

/**
 * ノートクリアのボタンを押した時の処理
 */
function handleNoteClear() {
    resetHistory();
}

/**
 * ノートに書き込むかどうかを切り替える関数
 */
function handleIsWriteToNoteEnabled() {
    isWriteToNoteEnabled = !isWriteToNoteEnabled;
    if (isWriteToNoteEnabled) {
        // writeToNoteButton.innerText = "On";
        // writeToNoteButton.classList.add("write-to-note-enabled")
        noteOutputEnableIcon.style.display = "block";
        noteOutputDisableIcon.style.display = "none";
    } else if (!isWriteToNoteEnabled) {
        // writeToNoteButton.innerText = "Off";
        // writeToNoteButton.classList.remove("write-to-note-enabled")
        noteOutputDisableIcon.style.display = "block";
        noteOutputEnableIcon.style.display = "none";
    }
}

/**
 * ノートのボタンを押した時の処理
 * @param {String} buttonText
 */
function handleNoteButtonClick(buttonText) {
    if (buttonText === NOTE_CLEAR) {
        handleNoteClear();
    } else if (buttonText === writeToNoteButton.innerText){
        handleIsWriteToNoteEnabled();
    }

}


// ノートのボタンにEvent Listenerを付ける
document.querySelectorAll("#note-btns .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleNoteButtonClick(button.innerText);
    });
});


export { handleNoteButtonClick, isWriteToNoteEnabled };