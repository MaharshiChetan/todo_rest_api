import { Router } from 'express';
import db from '../db/db';

let router = Router();

router.get('/v1/todos', (req, res, next) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  });
});

router.post('/v1/todos', (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'Title is required'
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'Description is required'
    });
  }

  const todo = {
    id: db.length + 1,
    title: req.body.title,
    description: req.body.description
  };

  db.push(todo);

  return res.status(201).send({
    success: 'true',
    message: 'Todo added successfully',
    todo
  });
});

router.get('/v1/todos/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  db.map(todo => {
    if (todo.id === id) {
      return res.status(200).send({
        success: 'true',
        message: 'Todo retrive successfully',
        todo
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'Todo does not exist'
  });
});

router.delete('/v1/todos/:id', (req, res, next) => {
  const id = parseInt(req.params.id, 10);

  db.map((todo, index) => {
    if (todo.id === id) {
      db.splice(index, 1);

      return res.status(200).send({
        success: 'true',
        message: 'Successfully deleted todo item'
      });
    }
  });

  return res.status(404).send({
    success: 'false',
    message: 'Requested todo not found'
  });
});

app.put('/v1/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;
  db.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) {
    return res.status(404).send({
      success: 'false',
      message: 'todo not found'
    });
  }

  if (!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if (!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }

  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description
  };

  db.splice(itemIndex, 1, updatedTodo);

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    updatedTodo
  });
});
export default router;
