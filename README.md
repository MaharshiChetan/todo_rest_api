# todo_rest_api

## Features

- Babel
- Express
- REST API

## Requirements

- [node & npm](https://nodejs.org/en/)
- [git](https://git-scm.com/)

## Installation

- `git clone https://github.com/MaharshiChetan/todo_rest_api.git`
- `cd todo_rest_api`
- `npm install`
- `npm start`

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Create a todo item with:
  - URL: http://localhost:3000/api/v1/todos/
  - Method: POST
  - Body: raw + JSON (application/json)
  - Body Content: `{ "title": "First todo", "description": "This is first todo item" }`
- Get all todos with:
  - URL: http://localhost:3000/api/v1/todos/
  - Method: GET
- Get todo by id with:
  - URL: http://localhost:3000/api/v1/todos/1
  - Method: GET
- Update todo item with:
  - URL: http://localhost:3000/api/v1/todos/1
  - Method: PUT
  - Body: raw + JSON (application/json)
  - Body Content: `{ "title": "Updated first todo", "description": "This is updated first todo item" }`
- Delete a todo item with:
  - URL: http://localhost:3000/api/v1/todos/1
  - Method: DELETE
