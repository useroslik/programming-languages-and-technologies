const button = document.querySelector('#load-users');
const statusText = document.querySelector('#status');
const usersList = document.querySelector('#users-list');

button.addEventListener('click', async () => {
    button.disabled = true;
    statusText.textContent = 'Загрузка...';
    statusText.style.color = 'black';
    usersList.replaceChildren();

    try {
        const response = await fetch('https://typicode.com');
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }

        const users = await response.json();

        for (const user of users) {
            const item = document.createElement('li');
            // Безопасное добавление текста во избежание XSS
            item.textContent = `👤 ${user.name} — ✉️ ${user.email}`;
            usersList.append(item);
        }

        statusText.textContent = `Успешно загружено пользователей: ${users.length}`;
        statusText.style.color = 'green';
    } catch (error) {
        statusText.textContent = `Ошибка загрузки: ${error.message}. Попробуйте еще раз.`;
        statusText.style.color = 'red';
    } finally {
        button.disabled = false;
    }
});