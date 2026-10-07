const ageInput = document.getElementById("age");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

function checkAge() {
    const age = Number(ageInput.value);

    if (ageInput.value === "") {
        result.textContent = "Введите ваш возраст!";
    } else if (!Number.isInteger(age) || age < 0 || age > 120) {
        result.textContent = "Введите корректный возраст!";
    } else if (age < 18) {
        result.textContent = "Вы несовершеннолетний.";
    } else if (age < 60) {
        result.textContent = "Вы совершеннолетний.";
    } else {
        result.textContent = "Вы пожилой человек.";
    }
}

checkBtn.addEventListener("click", checkAge);