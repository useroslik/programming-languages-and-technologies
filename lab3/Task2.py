class Book:
    def __init__(self, title, author, year, pages):
        self.title = title
        self.author = author
        self.year = year
        self.pages = pages

    def get_info(self):
        """Метод вывода информации о книге."""
        return f"Книга: '{self.title}', Автор: {self.author}, Год: {self.year}, Страниц: {self.pages}"

    def update_pages(self, new_pages):
        """Метод изменения количества страниц (демонстрация изменения состояния)."""
        if new_pages > 0:
            self.pages = new_pages

    def is_ancient(self, current_year=2026):
        """Дополнительный метод: проверка, является ли книга старинной (старше 50 лет)."""
        return (current_year - self.year) > 50

# --- Тестовые сценарии ---
# Создание 3 объектов класса
book1 = Book("Мастер и Маргарита", "Михаил Булгаков", 1967, 480)
book2 = Book("1984", "Джордж Оруэлл", 1949, 328)
book3 = Book("Пикник на обочине", "Аркадий и Борис Стругацкие", 1972, 220)

# Сценарий 1: Вывод информации и проверка старинности
print(book1.get_info())
print(f"Является ли старинной? {book1.is_ancient()}")

# Сценарий 2: Изменение количества страниц (состояния) у второй книги
print(f"До изменения страниц: {book2.get_info()}")
book2.update_pages(350)
print(f"После изменения страниц: {book2.get_info()}")

# Сценарий 3: Проверка третьей книги
print(book3.get_info())
print(f"Является ли старинной? {book3.is_ancient()}")