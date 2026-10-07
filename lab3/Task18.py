class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def get_info(self):
        """Метод для получения информации о студенте."""
        return f"{self.name}, {self.age} лет"


class Group:
    def __init__(self, group_name):
        self.group_name = group_name
        self.students = []  # Список для хранения объектов класса Student

    def add_student(self, student):
        """Добавление студента в группу."""
        if isinstance(student, Student):
            self.students.append(student)

    def remove_student(self, name):
        """Удаление студента из группы по его имени."""
        self.students = [s for s in self.students if s.name != name]

    def get_average_age(self):
        """Вычисление среднего возраста студентов в группе."""
        if not self.students:
            return 0
        total_age = sum(s.age for s in self.students)
        return total_age / len(self.students)

    def list_students(self):
        """Вывод списка всех студентов группы."""
        return [s.get_info() for s in self.students]