# 📝 Todo List Full-Stack App

A streamlined task management application built with **React** and **Node.js**. This project uses **SQLite** for a lightweight, serverless database experience. The frontend is pre-built and served directly by the backend for easy deployment.


## 🌟 Core Features

- **Dynamic Task Lists**: Tasks are automatically categorized into Todo and Done lists based on their completion status.

- **Complete CRUD**: * Add: Name, Description, and Due Date.

    - **Edit**: Click the Pen Icon to modify any field, including moving a task from "Todo" to "Done."

- **Custom Routing: * Main Page (/)**: Your primary workspace.

    - **Not Found Page**: A custom error page for incorrect URLs with a quick-return link in the navigation bar.

- **Integrated Deployment**: The React frontend is compiled and served as static assets from the backend's public folder.

## 🏗️ Project Structure

```bash
.
├── server.js           # Express server & SQLite logic
├── database.db         # Auto-generated SQLite database
├── public/             # Compiled React production build (the "Frontend")
│   ├── index.html
│   └── static/
└── package.json        # Backend dependencies
```

## 🛠️ Technical Stack

- **Frontend**: React (Build files located in `/public` and original file located in `/client`)

- **Backend**: Node.js + Express

- **Database**: SQLite3

- **Routing**: React Router (Client-side) & Express (Server-side)


## 🚀 Getting Started

Since the frontend is already built and stored in the `public` folder, you only need to set up the backend environment.
1. **Prerequisites**

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
2. **Installation**

Clone the repository and install the necessary dependencies:
```bash
git clone https://github.com/ftmhosseini/TodoListApp.git
cd TodoListApp
npm install
```
3. **Running the App**

Start the server with the following command:
```bash
npm start
```
Once the server is running, open your browser and navigate to:
`http://localhost:8800`.

## 📖 How it Works

**Data Flow**

1- **Fetching**: On load, the React frontend requests all tasks from the Node.js API.

2- **Storage**: SQLite stores your tasks in a local file (`database.db`), so your data persists even if you restart the server.

3- **Editing**: When you click the Pen, a modal or form appears allowing you to toggle the is completed `status`. This instantly moves the task between the "Todo" and "Done" lists upon saving.

**Navigation**

The app handles "Wrong" URLs by redirecting users to a dedicated **Not Found** page. To return to the main list, simply click the **Title Name** or **Home** link in the navigation bar.
