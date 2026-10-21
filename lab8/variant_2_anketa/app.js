const STORAGE_KEY = "lab8_profile_v2";
const form = document.querySelector("#profileForm");
const message = document.querySelector("#message");
const savedProfile = document.querySelector("#savedProfile");
const fields = {
  name: document.querySelector("#name"),
  group: document.querySelector("#group"),
  city: document.querySelector("#city")
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" ||
        typeof parsed.name !== "string" ||
        typeof parsed.group !== "string" ||
        typeof parsed.city !== "string") return null;
    return parsed;
  } catch (error) {
    console.error("Не удалось прочитать анкету:", error);
    return null;
  }
}

function renderProfile(profile) {
  if (!profile) {
    savedProfile.textContent = "Анкета пока не заполнена.";
    return;
  }
  savedProfile.replaceChildren();
  [["Имя", profile.name], ["Группа", profile.group], ["Город", profile.city]].forEach(([label, value]) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = label + ": ";
    p.append(strong, document.createTextNode(value));
    savedProfile.append(p);
  });
}

const existing = loadProfile();
if (existing) {
  fields.name.value = existing.name;
  fields.group.value = existing.group;
  fields.city.value = existing.city;
}
renderProfile(existing);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = {
    name: fields.name.value.trim(),
    group: fields.group.value.trim(),
    city: fields.city.value.trim()
  };
  if (Object.values(profile).some(value => !value)) {
    message.textContent = "Заполните все поля.";
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    renderProfile(profile);
    message.textContent = "Анкета успешно сохранена.";
  } catch (error) {
    message.textContent = "Не удалось сохранить данные. Проверьте настройки браузера.";
  }
});

document.querySelector("#clearBtn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  renderProfile(null);
  message.textContent = "Сохранённая анкета удалена.";
});