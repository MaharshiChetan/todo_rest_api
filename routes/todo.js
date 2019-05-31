import { Router } from 'express';
import todoController from '../todosControllers/todos';

let router = Router();

router.get('/v1/todos', todoController.getAllTodos);
router.get('/v1/todos/:id', todoController.getTodo);
router.post('/v1/todos', todoController.createTodo);
router.put('/v1/todos/:id', todoController.updateTodo);
router.delete('/v1/todos/:id', todoController.deleteTodo);

export default router;
