import express from 'express';
import { addTodo, getTodos, getUserTodos, updateTodo, removeTodo } from '../controllers/todo.controller.js'
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/add', auth, addTodo);
router.get('/get', auth, getTodos);
router.get('/getUserTodos', auth, getUserTodos);
router.patch('/edit/:todoId', auth, updateTodo);
router.delete('/delete/:todoId', auth, removeTodo);

export default router;