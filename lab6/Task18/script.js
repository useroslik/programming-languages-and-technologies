const fileList = document.querySelector("#fileList");
const itemNameInput = document.querySelector("#itemNameInput");
const addFolderBtn = document.querySelector("#addFolderBtn");
const addFileBtn = document.querySelector("#addFileBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const renameBtn = document.querySelector("#renameBtn");

let selectedItem = null;

// Функция добавления элемента (папки или файла)
function addItem(type) {
    const name = itemNameInput.value.trim();
    if (!name) {
        alert("Введите имя элемента!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = name;
    li.classList.add(type);

    // Выделение элемента по клику
    li.addEventListener("click", (e) => {
        e.stopPropagation();
        if (selectedItem) {
            selectedItem.classList.remove("selected");
        }
        selectedItem = li;
        selectedItem.classList.add("selected");
    });

    fileList.append(li);
    itemNameInput.value = "";
}

addFolderBtn.addEventListener("click", () => addItem("folder"));
addFileBtn.addEventListener("click", () => addItem("file"));

// Удаление выбранного элемента
deleteBtn.addEventListener("click", () => {
    if (!selectedItem) {
        alert("Выберите элемент для удаления!");
        return;
    }
    selectedItem.remove();
    selectedItem = null;
});

// Переименование выбранного элемента
renameBtn.addEventListener("click", () => {
    if (!selectedItem) {
        alert("Выберите элемент для переименования!");
        return;
    }
    const newName = prompt("Введите новое имя:", selectedItem.textContent.trim());
    if (newName && newName.trim() !== "") {
        // Сохраняем иконку (класс), меняем текст
        const isFolder = selectedItem.classList.contains("folder");
        selectedItem.textContent = newName.trim();
        selectedItem.classList.add(isFolder ? "folder" : "file");
    }
});