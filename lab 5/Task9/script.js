const passwordInput = document.getElementById("password");
const lengthRule = document.getElementById("length");
const digitRule = document.getElementById("digit");
const result = document.getElementById("result");

function checkPassword() {
    const password = passwordInput.value;

    // Проверка длины пароля
    const hasLength = password.length >= 8;

    // Проверка наличия цифры
    const hasDigit = /\d/.test(password);

    // Отображение результатов проверок
    if (hasLength) {
        lengthRule.textContent = "✓ Не менее 8 символов";
        lengthRule.className = "valid";
    } else {
        lengthRule.textContent = "✗ Не менее 8 символов";
        lengthRule.className = "invalid";
    }

    if (hasDigit) {
        digitRule.textContent = "✓ Хотя бы одна цифра";
        digitRule.className = "valid";
    } else {
        digitRule.textContent = "✗ Хотя бы одна цифра";
        digitRule.className = "invalid";
    }

    // Общий результат
    if (password === "") {
        result.textContent = "Введите пароль для проверки.";
        result.className = "";
    } else if (hasLength && hasDigit) {
        result.textContent = "Пароль соответствует требованиям!";
        result.className = "valid";
    } else {
        result.textContent = "Пароль не соответствует требованиям.";
        result.className = "invalid";
    }
}

// Проверка при вводе пароля
passwordInput.addEventListener("input", checkPassword);