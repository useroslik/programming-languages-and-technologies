const pages = {
    faculties: `
        <h2>Факультеты университета</h2>
        <div class="card"><h3>Факультет информационных технологий</h3><p>Направления: Разработка ПО, ИИ, Кибербезопасность.</p></div>
        <div class="card"><h3>Экономический факультет</h3><p>Направления: Финансы, Маркетинг, Менеджмент.</p></div>
    `,
    schedule: `
        <h2>Расписание занятий</h2>
        <div class="card"><h3>Понедельник</h3><p>09:00 — Технология программирования (Лекция)</p></div>
        <div class="card"><h3>Вторник</h3><p>11:30 — Базы данных (Практика)</p></div>
    `,
    contacts: `
        <h2>Контакты</h2>
        <p>Адрес: ул. Университетская, 1</p>
        <p>Телефон: +7 (727) 123-45-67</p>
        <p>Email: info@university.edu</p>
    `
};

const content = document.querySelector("#content");
const buttons = document.querySelectorAll(".nav-btn");

function switchPage(pageKey) {
    content.textContent = ""; // Очистка
    content.innerHTML = pages[pageKey] || "<p>Страница не найдена</p>";
}

buttons.link = buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        switchPage(btn.dataset.page);
    });
});

// Инициализация стартовой вкладки
switchPage("faculties");