import db from '../db/db';
import models from '../models';

class TodosController {
  getAllTodos(req, res) {
    models.Todo.findAll().then(todos =>
      res.status(200).send({
        success: 'true',
        message: 'Todos retrieved successfully',
        todos
      })
    );
  }

  getTodo(req, res) {
    const id = parseInt(req.params.id, 10);
    models.Todo.findById(id).then(todo => {
      if (todo) {
        return res.status(200).send({
          success: 'true',
          message: 'Todo retrieved successfully',
          todo
        });
      }
      return res.status(404).send({
        success: 'false',
        message: 'Todo does not exist'
      });
    });
  }

  createTodo(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      });
    }
    // else if (!req.body.description) {
    //   return res.status(400).send({
    //     success: 'false',
    //     message: 'description is required'
    //   });
    // }
    // const todo = {
    //   id: db.length + 1,
    //   title: req.body.title,
    //   description: req.body.description
    // };
    // db.push(todo);
    // return res.status(201).send({
    //   success: 'true',
    //   message: 'Todo added successfully',
    //   todo
    // });

    const todo = {
      title: req.body.title
    };
    models.Todo.create(todo).then(todo => {
      return res.status(201).send({
        success: 'true',
        message: 'Todo added successfully',
        todo
      });
    });
  }

  updateTodo(req, res) {
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
        message: 'Requested todo not found'
      });
    }

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

    const newTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description
    };

    db.splice(itemIndex, 1, newTodo);

    return res.status(201).send({
      success: 'true',
      message: 'Todo added successfully',
      newTodo
    });
  }

  deleteTodo(req, res) {
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
        message: 'Requested todo not found'
      });
    }
    db.splice(itemIndex, 1);

    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly'
    });
  }
}

const todoController = new TodosController();
export default todoController;
