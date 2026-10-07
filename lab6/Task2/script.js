const counterValueElement = document.querySelector("#counterValue");
const incrementBtn = document.querySelector("#incrementBtn");
const decrementBtn = document.querySelector("#decrementBtn");
const resetBtn = document.querySelector("#resetBtn");

let count = 0;

function updateDisplay() {
    counterValueElement.textContent = count;
}

incrementBtn.addEventListener("click", () => {
    count++;
    updateDisplay();
});

decrementBtn.addEventListener("click", () => {
    count--;
    updateDisplay();
});

resetBtn.addEventListener("click", () => {
    count = 0;
    updateDisplay();
});