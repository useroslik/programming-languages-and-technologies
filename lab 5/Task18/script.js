// Массив студентов и их оценок
const students = [
    { name: "Али", grades: [5, 4, 5, 5] },
    { name: "Айжан", grades: [4, 5, 4, 5] },
    { name: "Данияр", grades: [3, 4, 3, 4] },
    { name: "Мадина", grades: [5, 5, 5, 4] },
    { name: "Ерлан", grades: [4, 3, 5, 4] }
];

// Получаем элементы HTML
const journalBody = document.getElementById("journalBody");
const groupAverage = document.getElementById("groupAverage");
const sortBtn = document.getElementById("sortBtn");

// Функция вычисления среднего балла
function calculateAverage(grades) {
    if (grades.length === 0) {
        return 0;
    }

    let sum = 0;

    for (const grade of grades) {
        sum += grade;
    }

    return sum / grades.length;
}

// Функция отображения журнала
function renderJournal() {
    journalBody.innerHTML = "";

    let totalAverage = 0;

    // Перебираем студентов
    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const average = calculateAverage(student.grades);
        totalAverage += average;

        // Создаем строку таблицы
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${student.name}</td>
            <td>${student.grades.join(", ")}</td>
            <td>${average.toFixed(2)}</td>
        `;

        journalBody.appendChild(row);
    }

    // Вычисляем средний балл всей группы
    const averageGroup = students.length > 0
        ? totalAverage / students.length
        : 0;

    groupAverage.textContent =
        "Средний балл группы: " + averageGroup.toFixed(2);
}

// Сортировка по среднему баллу
sortBtn.addEventListener("click", function () {
    students.sort(function (a, b) {
        return calculateAverage(b.grades) -
               calculateAverage(a.grades);
    });

    renderJournal();
});

// Первоначальное отображение таблицы
renderJournal();