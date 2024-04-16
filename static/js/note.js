import { resetHistory } from "./calculate.js";

let writeToNoteButton = document.querySelector("#write-to-note");
let isWriteToNoteEnabled = true;

const NOTE_CLEAR = "Note Clear";

// ノートクリアのボタンを押した時の処理
function handleNoteClear() {
    resetHistory();
}

// ノートに書き込むかどうかを切り替える関数
function handleIsWriteToNoteEnabled() {
    isWriteToNoteEnabled = !isWriteToNoteEnabled;
    if (isWriteToNoteEnabled) {
        writeToNoteButton.innerText = "On";
        writeToNoteButton.classList.add("write-to-note-enabled")
    } else if (!isWriteToNoteEnabled) {
        writeToNoteButton.innerText = "Off";
        writeToNoteButton.classList.remove("write-to-note-enabled")
    }
}

// ノートのボタンを押した時の処理
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