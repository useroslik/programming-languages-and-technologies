#Задание №19 (Продвинутый Уровень) 
import math

# Ввод данных
a = float(input("Введите первый катет: "))
b = float(input("Введите второй катет: "))

# Вычисления
c = math.sqrt(a**2 + b**2)  # Гипотенуза
area = 0.5 * a * b          # Площадь
perimeter = a + b + c       # Периметр

# Вычисление острых углов в градусах
alpha = math.degrees(math.atan(a / b))
beta = 90.0 - alpha

# Вывод результатов
print(f"Гипотенуза: {c:.2f}")
print(f"Площадь: {area:.2f}")
print(f"Периметр: {perimeter:.2f}")
print(f"Первый острый угол: {alpha:.2f}°")
print(f"Второй острый угол: {beta:.2f}°")
