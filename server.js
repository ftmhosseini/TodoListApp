import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDB } from './utilitiy/sqlite.js';
import todoRoute from './route/todoListRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const server = express()

// Security/Middleware
server.use(cors())
server.use(express.urlencoded())
server.use(express.json())

async function startServer() {
    const db = await setupDB();
    // const db = setupDB()
    server.use((req, res, next) => {
        req.db = db;
        next();
    });

    // Static Files (CSS, JS, Images)
    server.use(express.static(path.join(__dirname, 'build')));
    

    // 2. API Routes
    server.use('/api/todos', todoRoute)
    
    server.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    const PORT = process.env.PORT || 8800;
    // Define HOST as '0.0.0.0' // Best for Docker/Render/Cloud
    // '127.0.0.1' or 'localhost' // Best for Browser
    const HOST = process.env.HOST || '127.0.0.1';

    // Start the server
    server.listen(PORT, HOST, () => {
        console.log(`Server running on ${HOST}:${PORT}`);
    });
}

startServer().catch(err => console.error("Failed to start server:", err));