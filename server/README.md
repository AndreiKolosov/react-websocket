# <a id="top" />Server

### Оглавление

- [Описание](#description)
- [Ссылки](#references)

---

## <a id="description" />Описание и особенности
  Вебсокет демо. Серверная часть - Node.js, Express, TypeScript. 
  Базовый функционал был взят из этого [→ туториала ←](https://blog.logrocket.com/websocket-tutorial-real-time-node-react/). Произведен рефакторинг, доработка и расширение функционала.

  - Добавлен Typescript.
  - Добавлен Express.
  - Разделение на API & Websocket. Заложен базовый функционал API. Создан один роут с цитатами.
  - По дефолту, сокет работает на порту ``5000``, API на порту ``4000``. Порты можно поменять в файле ``.env`` (смотри ``.env.example``).
  - Обработка событий сокетного соединения вынесена в отдельный файл.
  - 

### Технологии
- Node.js
- ws (websocket server)
- Express.js

[Наверх](#top)

---

## <a id="references" />Ссылки

### [- Главный Readme](../README.md)


[Наверх](#top)