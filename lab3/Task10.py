class Laptop:
    def __init__(self, brand, model, ram, price):
        self.brand = brand
        self.model = model
        self._ram = ram       # Защищенный атрибут оперативной памяти
        self._price = price   # Защищенный атрибут цены

    def upgrade_ram(self, additional_ram):
        """Увеличение объема оперативной памяти."""
        if additional_ram > 0:
            self._ram += additional_ram

    def change_price(self, new_price):
        """Изменение цены ноутбука."""
        if new_price >= 0:
            self._price = new_price

    def get_specs(self):
        """Вывод характеристик ноутбука."""
        return f"{self.brand} {self.model} | ОЗУ: {self._ram} ГБ | Цена: {self._price} тенге"

# --- Тестовые сценарии ---
# Создание 3 объектов класса
laptop1 = Laptop("Apple", "MacBook Pro 14", 16, 750000)
laptop2 = Laptop("ASUS", "TUF Gaming", 8, 380000)
laptop3 = Laptop("Lenovo", "ThinkPad E14", 16, 420000)

# Сценарий 1: Просмотр характеристик и апгрейд ОЗУ первого ноутбука
print(laptop1.get_specs())
laptop1.upgrade_ram(16)
print(f"После апгрейда RAM: {laptop1.get_specs()}")

# Сценарий 2: Изменение цены второго ноутбука со скидкой
print(laptop2.get_specs())
laptop2.change_price(350000)
print(f"После изменения цены: {laptop2.get_specs()}")

# Сценарий 3: Апгрейд и изменение цены третьего ноутбука
print(laptop3.get_specs())
laptop3.upgrade_ram(16)
laptop3.change_price(450000)
print(f"Итоговые характеристики третьего ноутбука: {laptop3.get_specs()}")