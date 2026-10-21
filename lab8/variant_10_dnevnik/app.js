const STORAGE_KEY = "lab8_diary_v10";
const form = document.querySelector("#entryForm");
const dateInput = document.querySelector("#entryDate");
const textInput = document.querySelector("#entryText");
const entriesElement = document.querySelector("#entries");
const message = document.querySelector("#message");
const count = document.querySelector("#count");
dateInput.value = new Date().toLocaleDateString("en-CA");

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(item =>
      item && typeof item.id === "string" &&
      typeof item.date === "string" && typeof item.text === "string"
    ) : [];
  } catch (error) {
    console.error("Повреждённые данные дневника:", error);
    return [];
  }
}
let entries = loadEntries();

function saveEntries() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    renderEntries();
    return true;
  } catch (error) {
    message.textContent = "Не удалось сохранить записи. Проверьте настройки браузера.";
    return false;
  }
}

function renderEntries() {
  entriesElement.replaceChildren();
  count.textContent = `${entries.length} ${entries.length === 1 ? "запись" : entries.length >= 2 && entries.length <= 4 ? "записи" : "записей"}`;
  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Записей пока нет.";
    entriesElement.append(empty);
    return;
  }
  [...entries].sort((a, b) => b.date.localeCompare(a.date)).forEach(entry => {
    const card = document.createElement("article");
    card.className = "entry";
    const head = document.createElement("div");
    head.className = "entry-head";
    const date = document.createElement("span");
    date.className = "entry-date";
    date.textContent = entry.date;
    const del = document.createElement("button");
    del.className = "delete";
    del.type = "button";
    del.textContent = "Удалить";
    del.addEventListener("click", () => {
      entries = entries.filter(item => item.id !== entry.id);
      saveEntries();
      message.textContent = "Запись удалена.";
    });
    const body = document.createElement("p");
    body.textContent = entry.text;
    head.append(date, del);
    card.append(head, body);
    entriesElement.append(card);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const date = dateInput.value;
  const text = textInput.value.trim();
  if (!date || !text) {
    message.textContent = "Укажите дату и текст записи.";
    return;
  }
  entries.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, date, text });
  if (saveEntries()) {
    textInput.value = "";
    message.textContent = "Запись добавлена.";
  }
});
renderEntries();