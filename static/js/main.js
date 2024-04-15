import { handleButtonClick, updateDisplay } from "./calculate.js";
import { handleNoteButtonClick } from "./note.js";

// ノートのボタンにEvent Listenerを付ける
document.querySelectorAll("#note-btns .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleNoteButtonClick(button.innerText);
    });
});

// 計算機のボタンにEvent Listenerを付ける
document.querySelectorAll("#calculator-btns .btn").forEach((button) => {
    button.addEventListener("click", () => {
        handleButtonClick(button.innerText);
    });
});

// Initialization
updateDisplay(); 
