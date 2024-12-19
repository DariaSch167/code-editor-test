# CodeEditor: CodeMirror and MirageJS
Редактор кода c использованием библиотеки CodeMirror и имитацией сервера на MirageJS 

https://dariasch167.github.io/code-editor-test/

## Описание
- блок с описанием задания: принимает строку с заданием из json-файла на мок-сервере
- навигация по заданиям (вперед / назад), с проверкой существования следующего задания
- редактор кода с подсветкой синтаксиса
- радио-кнопки переключения языка JS / Python
- кнопка отправки объекта с кодом для обработки на сервер
- имитация отработки кода мок-сервером и получение ответа
- результат, в виде ответа сервера: результат выполнения / ошибка
- базовая адаптация к разным размерам экрана

## Стек
React, Vite, Sass, CodeMirror, MirageJS

## Инструкция по установке и запуску
- npm install
- npm run dev
- Приложение запустится на http://localhost:5173/code-editor-test/
- Для тестирования правильных ответов использовать данные из tasks.json 

## Логика обработки запросов на мок-сервере
- server/tasks.json, массив с задачами: id, описание, правильный ответ на JS и Python, результат
- server/mirage.js, на мок-сервере прописаны энд-поинты для двух методов: GET - получить объект задания по ID, POST - отправка объекта на исполнение (ID, язык, код)
- api/api.js, вынесены асинхронные функции запросов к мок-серверу: loadTask, checkNextTask, runCode
- GET-запрос принимает id задачи, находит её в массиве задач и возвращает полный объект с задачей, или ошибку
- POST-запрос принимает объект с кодом - убирает из кода пробелы, и сравнивает с решением задачи из массива, ответ: результат или ошибка

## Ограничения
Переданный код сравнивается с правильным ответом через строгое равенство. Не допускается использование других наименований и способов решений.

## Варианты расширения
- добавление подсказок для решения задач
- добавление отслеживания прогресса пользователя (количество правильных решений)
- добавление менеджера состояний для обработки асинхронных запросов
- проверка ответа задания через запуск кода

## Preview
![image](https://github.com/user-attachments/assets/01ab7598-3fd0-432c-971d-4966ae687dcb)

![image](https://github.com/user-attachments/assets/9f8ad725-e78d-42c4-8d8e-cbcfd14cb409)

