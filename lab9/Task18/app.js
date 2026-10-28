const button = document.querySelector('#load-analytics');
const statusText = document.querySelector('#status');
const analyticsList = document.querySelector('#analytics-list');

button.addEventListener('click', async () => {
    button.disabled = true;
    statusText.textContent = 'Параллельная загрузка данных...';
    statusText.style.color = 'black';
    analyticsList.replaceChildren();

    try {
        // Выполняем запросы параллельно
        const [usersResponse, postsResponse] = await Promise.all([
            fetch('https://typicode.com'),
            fetch('https://typicode.com')
        ]);

        // Проверяем статус ответов обоих ресурсов
        if (!usersResponse.ok) throw new Error(`Ошибка загрузки пользователей: ${usersResponse.status}`);
        if (!postsResponse.ok) throw new Error(`Ошибка загрузки публикаций: ${postsResponse.status}`);

        // Десериализуем данные параллельно
        const [users, posts] = await Promise.all([
            usersResponse.json(),
            postsResponse.json()
        ]);

        // Подсчитываем количество постов для каждого userId
        const postCounts = {};
        for (const post of posts) {
            postCounts[post.userId] = (postCounts[post.userId] || 0) + 1;
        }

        // Выводим аналитику по пользователям
        for (const user of users) {
            const count = postCounts[user.id] || 0;

            const item = document.createElement('li');
            
            const nameSpan = document.createElement('span');
            nameSpan.textContent = `👤 ${user.name} (ID: ${user.id})`;
            
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge';
            badgeSpan.textContent = `Постов: ${count}`;

            item.append(nameSpan, badgeSpan);
            analyticsList.append(item);
        }

        statusText.textContent = 'Аналитика успешно составлена!';
        statusText.style.color = 'green';
    } catch (error) {
        statusText.textContent = `Произошла ошибка: ${error.message}. Нажмите кнопку для повтора.`;
        statusText.style.color = 'red';
    } finally {
        button.disabled = false;
    }
});