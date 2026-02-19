import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {setupDB} from './utilitiy/sqlite.js'
import { getTodoItem, getTodoList, updateTodoTask, addTodoItem, deleteTodoItem } from './controller/todoController.js';
dotenv.config();
const server = express()
server.use(cors())
// server.set('view engine','ejs')
// server.use('/', (req,res)=>{
//     res.render("index",{
//         content:"Hello from server.js",
//         title:"test website",
//         contentWithHtmleTage:'this is <em>test</em> from server'
//     })
// })
server.use(express.static('../client'))
server.use(express.urlencoded())
server.use(express.json())
// const todos = [
//     { id: '1', title: 'Learn APIs', completed: false },
//     { id: '2', title: 'Connect Backend', completed: false },
//     { id: '10', title: 'Connect to backedn', completed: true }
// ];

// server.get('/api/todos', (req, res) => {
//     console.log(todos);
    
//     res.json(todos); // Sends the data as JSON
// });

// server.use('/', (req, res) => {
//     setupDB()
//     res.render("index", "{ ... }");
// });

// const PORT = process.env.PORT || 3000; 
// const URL = process.env.URL || '0.0.0.0';
// server.listen(PORT, URL, () => console.info(`Server running on port ${PORT} with ${URL}`));

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
    // server.put('/api/todos/:id', updateTodoItemStatus);
    server.delete('/api/todos/:id', deleteTodoItem);

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}`));
}

startServer().catch(err => console.error("Failed to start server:", err));