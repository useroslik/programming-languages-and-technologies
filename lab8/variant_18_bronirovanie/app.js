const STORAGE_KEY = "lab8_bookings_v18";
const form = document.querySelector("#bookingForm");
const dateInput = document.querySelector("#bookingDate");
const timeInput = document.querySelector("#bookingTime");
const roomInput = document.querySelector("#room");
const purposeInput = document.querySelector("#purpose");
const bookingsElement = document.querySelector("#bookings");
const message = document.querySelector("#message");
const count = document.querySelector("#count");
dateInput.min = new Date().toLocaleDateString("en-CA");

function loadBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(item =>
      item && typeof item.id === "string" &&
      typeof item.date === "string" &&
      typeof item.time === "string" &&
      typeof item.room === "string" &&
      typeof item.purpose === "string"
    ) : [];
  } catch (error) {
    console.error("Не удалось прочитать бронирования:", error);
    return [];
  }
}
let bookings = loadBookings();

function saveBookings() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    renderBookings();
    return true;
  } catch (error) {
    message.textContent = "Не удалось сохранить данные. Проверьте настройки браузера.";
    return false;
  }
}

function renderBookings() {
  bookingsElement.replaceChildren();
  count.textContent = `${bookings.length} бронирований`;
  if (!bookings.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Пока нет бронирований.";
    bookingsElement.append(empty);
    return;
  }
  [...bookings].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).forEach(booking => {
    const card = document.createElement("article");
    card.className = "booking";
    const title = document.createElement("h3");
    title.textContent = booking.room;
    const dateTime = document.createElement("p");
    dateTime.textContent = `${booking.date} · ${booking.time}`;
    const purpose = document.createElement("p");
    purpose.textContent = booking.purpose ? `Цель: ${booking.purpose}` : "Цель не указана";
    const del = document.createElement("button");
    del.type = "button";
    del.className = "delete";
    del.textContent = "Отменить бронь";
    del.addEventListener("click", () => {
      bookings = bookings.filter(item => item.id !== booking.id);
      saveBookings();
      message.textContent = "Бронирование отменено.";
    });
    card.append(title, dateTime, purpose, del);
    bookingsElement.append(card);
  });
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const date = dateInput.value;
  const time = timeInput.value;
  const room = roomInput.value;
  const purpose = purposeInput.value.trim();
  if (!date || !time || !room) {
    message.textContent = "Заполните дату, время и помещение.";
    return;
  }
  if (date < dateInput.min) {
    message.textContent = "Нельзя бронировать на прошедшую дату.";
    return;
  }
  const conflict = bookings.some(item => item.date === date && item.time === time && item.room === room);
  if (conflict) {
    message.textContent = "Конфликт: это помещение уже забронировано на выбранные дату и время.";
    return;
  }
  bookings.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, date, time, room, purpose });
  if (saveBookings()) {
    form.reset();
    message.textContent = "Бронирование успешно добавлено.";
  }
});
renderBookings();