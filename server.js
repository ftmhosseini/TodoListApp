import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {setupDB} from './utilitiy/sqlite.js'
import { getTodoItem, getTodoList, updateTodoTask, addTodoItem, deleteTodoItem } from './controller/todoController.js';
dotenv.config();
const server = express()
server.use(cors())
server.use(express.urlencoded())
server.use(express.json())

async function startServer() {
    const db = await setupDB();
    
    // Attach db to req so controllers can access it
    server.use((req, res, next) => {
        req.db = db;
        next();
    });
    server.use(express.static('public'))

    // 2. API Routes
    server.get('/api/todos', getTodoList);
    server.get('/api/todos/:id', getTodoItem);

    server.post('/api/todos', addTodoItem);
    server.put('/api/todos/:id', updateTodoTask);
    server.delete('/api/todos/:id', deleteTodoItem);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}`));
}

startServer().catch(err => console.error("Failed to start server:", err));