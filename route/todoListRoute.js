import express from 'express'
// const express = require('express')
// Note: Using ES Modules (import) instead of CommonJS (require) for modern syntax
import { getTodoItem, getTodoList, updateTodoTask, addTodoItem, deleteTodoItem } from '../controller/todoController.js';

/** * task todoRouter
 * Handles all requests directed to /api/todos
 */
const todoRoute = express.Router()
/**
 * @todoRoute   GET /api/todos
 * @desc    Retrieve a list of all tasks
 */
todoRoute.get('/', getTodoList)
/**
 * @todoRoute   GET /api/todos/:id
 * @desc    Get details for a single task by their unique ID
 */
todoRoute.get('/:id', getTodoItem)
/**
 * @todoRoute   POST /api/todos
 * @desc    Register or create a new task
 */
todoRoute.post('/', addTodoItem)
/**
 * @todoRoute   PUT /api/todos/:id
 * @desc    Update an existing task's full profile
 */
todoRoute.put('/:id', updateTodoTask)
/**
 * @todoRoute   DELETE /api/todos/:id
 * @desc    Remove a task from the system
 */
todoRoute.delete('/:id', deleteTodoItem)

export default todoRoute;