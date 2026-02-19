import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
// const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');

export async function setupDB() {
    // Open the database file (it will be created if it doesn't exist)
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    });

    // Create a table for your Todo List
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            -- Use INTEGER for status (0 = todo, 1 = done)
            status INTEGER DEFAULT 0,
            -- Store dates as TEXT (e.g., "2026-02-10") for easy reading
            dueTo DATE,
            -- Good practice to track when it was created
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}