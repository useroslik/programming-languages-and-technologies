import math

a = float(input("Введите сторону a: "))
b = float(input("Введите сторону b: "))
c = float(input("Введите сторону c: "))

p = a + b + c
s = p / 2

area = math.sqrt(s * (s - a) * (s - b) * (s - c))

print("Периметр:", p)
print("Полупериметр:", s)
print("Площадь:", area)