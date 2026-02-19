import express from 'express'
// const express = require('express')
// Note: Using ES Modules (import) instead of CommonJS (require) for modern syntax
import { getTodoList, getTodoItem, addTodoItem, updateTodoTask, deleteTodoItem } from '../controllers/taskController.js'

/** * task Router
 * Handles all requests directed to /api/todos
 */
const route = express.Router()
/**
 * @route   GET /api/todos
 * @desc    Retrieve a list of all tasks
 */
route.get('/', getTodoList)
/**
 * @route   GET /api/todos/:id
 * @desc    Get details for a single task by their unique ID
 */
route.get('/:id', getTodoItem)
/**
 * @route   POST /api/todos
 * @desc    Register or create a new task
 */
route.post('/', addTodoItem)
/**
 * @route   PUT /api/todos/:id
 * @desc    Update an existing task's full profile
 */
route.put('/:id', updateTodoTask)
/**
 * @route   DELETE /api/todos/:id
 * @desc    Remove a task from the system
 */
route.delete('/:id', deleteTodoItem)

export default route;