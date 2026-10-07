seconds = int(input("Введите количество секунд: "))

hours = seconds // 3600
minutes = seconds // 60 % 60
seconds = seconds % 60

print(f"{hours}:{minutes:02d}:{seconds:02d}")
