let orders = [
    { id: 101, client: "Анна С.", item: "Ноутбук ASUS", status: "new" },
    { id: 102, client: "Иван П.", item: "Смартфон iPhone", status: "in-progress" },
    { id: 103, client: "Ольга К.", item: "Наушники Sony", status: "done" }
];

let currentStatus = 'new';

const ordersList = document.querySelector("#ordersList");
const buttons = document.querySelectorAll(".nav-btn");

function updateCounters() {
    document.querySelector("#count-new").textContent = orders.filter(o => o.status === 'new').length;
    document.querySelector("#count-in-progress").textContent = orders.filter(o => o.status === 'in-progress').length;
    document.querySelector("#count-done").textContent = orders.filter(o => o.status === 'done').length;
}

function getNextStatus(current) {
    if (current === 'new') return 'in-progress';
    if (current === 'in-progress') return 'done';
    return null;
}

function getNextButtonLabel(current) {
    if (current === 'new') return 'В работу ➔';
    if (current === 'in-progress') return 'Готово ✓';
    return null;
}

function renderOrders() {
    ordersList.innerHTML = "";
    updateCounters();

    const filtered = orders.filter(o => o.status === currentStatus);

    if (filtered.length === 0) {
        ordersList.innerHTML = "<p>В этом разделе пока нет заказов.</p>";
        return;
    }

    filtered.forEach(order => {
        const card = document.createElement("div");
        card.classList.add("order-card");

        const info = document.createElement("div");
        info.innerHTML = `<strong>Заказ #${order.id}</strong><br>Клиент: ${order.client}<br>Товар: ${order.item}`;
        card.appendChild(info);

        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
            const actionBtn = document.createElement("button");
            actionBtn.textContent = getNextButtonLabel(order.status);
            actionBtn.addEventListener("click", () => {
                order.status = nextStatus;
                renderOrders();
            });
            card.appendChild(actionBtn);
        } else {
            const statusLabel = document.createElement("span");
            statusLabel.textContent = "Завершен";
            statusLabel.style.color = "green";
            statusLabel.style.fontWeight = "bold";
            card.appendChild(statusLabel);
        }

        ordersList.appendChild(card);
    });
}

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentStatus = btn.dataset.status;
        renderOrders();
    });
});

renderOrders();