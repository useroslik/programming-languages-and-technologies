const button = document.querySelector('#load-posts');
const userIdInput = document.querySelector('#user-id-input');
const statusText = document.querySelector('#status');
const postsList = document.querySelector('#posts-list');

button.addEventListener('click', async () => {
    const userId = userIdInput.value.trim();

    if (!userId) {
        statusText.textContent = 'Пожалуйста, введите корректный ID.';
        statusText.style.color = 'orange';
        return;
    }

    button.disabled = true;
    statusText.textContent = 'Загрузка...';
    statusText.style.color = 'black';
    postsList.replaceChildren();

    try {
        const response = await fetch(`https://typicode.com{userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }

        const posts = await response.json();

        if (posts.length === 0) {
            statusText.textContent = `У пользователя с ID ${userId} нет публикаций или пользователя не существует.`;
            statusText.style.color = 'orange';
            return;
        }

        for (const post of posts) {
            const item = document.createElement('li');
            
            const titleElement = document.createElement('strong');
            titleElement.textContent = `${post.id}. ${post.title}`;
            
            const bodyElement = document.createElement('p');
            bodyElement.textContent = post.body;
            bodyElement.style.margin = "5px 0 0 0";

            item.append(titleElement, bodyElement);
            postsList.append(item);
        }

        statusText.textContent = `Успешно загружено публикаций: ${posts.length}`;
        statusText.style.color = 'green';
    } catch (error) {
        statusText.textContent = `Ошибка загрузки: ${error.message}. Повторите попытку.`;
        statusText.style.color = 'red';
    } finally {
        button.disabled = false;
    }
});