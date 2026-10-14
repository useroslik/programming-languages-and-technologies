let tasks = [
    { id: 1, text: 'Сдать лабораторную работу №7', completed: false },
    { id: 2, text: 'Подготовиться к защите', completed: true }
];

let currentFilter = 'all';

const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");
const buttons = document.querySelectorAll(".nav-btn");

function renderTasks() {
    taskList.innerHTML = "";
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const span = document.createElement("span");
        span.textContent = task.text;

        const delBtn = document.createElement("button");
        delBtn.textContent = "Удалить";
        delBtn.classList.add("delete-btn");
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        const leftDiv = document.createElement("div");
        leftDiv.style.display = "flex";
        leftDiv.style.alignItems = "center";
        leftDiv.style.gap = "10px";
        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        li.appendChild(leftDiv);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        taskInput.value = "";
        renderTasks();
    }
});

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();