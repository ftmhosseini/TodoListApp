import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDB } from './utilitiy/sqlite.js';
import todoRoute from './route/todoListRoute.js';
// import { getTodoItem, getTodoList, updateTodoTask, addTodoItem, deleteTodoItem } from './controller/todoController.js';
dotenv.config();
const server = express()
server.use(cors())
server.use(cors({ origin: 'https://simplerestapi-gjve.onrender.com' }));
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
    server.use('/api/todos', todoRoute)
    // server.get('/api/todos', getTodoList);
    // server.get('/api/todos/:id', getTodoItem);
    // server.post('/api/todos', addTodoItem);
    // server.put('/api/todos/:id', updateTodoTask);
    // server.delete('/api/todos/:id', deleteTodoItem);

    // 1. Get the PORT from Render's environment, or fallback to 8800 for local dev
    const PORT = process.env.PORT || 3000;
    // 2. Define HOST as '0.0.0.0' (This fixes your previous ReferenceError!)
    const HOST = '0.0.0.0';

    // 3. Start the server
    server.listen(PORT, () => console.log(`Server is running on http://${HOST}:${PORT}`));
}

startServer().catch(err => console.error("Failed to start server:", err));