# 📝 Todo List Full-Stack App

A streamlined task management application built with **React** and **Node.js**. This project uses **SQLite** for a lightweight, serverless database experience. The frontend is pre-built and served directly by the backend for easy deployment.


## 🌟 Core Features

- **Dynamic Task Lists**: Tasks are automatically categorized into Todo and Done lists based on their completion status.

- **Complete CRUD**: * Add: Name, Description, and Due Date.

    - **Edit**: Click the Pen Icon to modify any field, including moving a task from "Todo" to "Done."

- **Custom Routing: * Main Page (/)**: Your primary workspace.

    - **Not Found Page**: A custom error page for incorrect URLs with a quick-return link in the navigation bar.

- **Integrated Deployment**: The React frontend is compiled and served as static assets from the backend's build folder.

## 🏗️ Project Structure

```bash
.
├── server.js           # Express server & SQLite logic
├── database.sqlite     # Auto-generated SQLite database
├── build/             # Compiled React production build (the "Frontend")
│   ├── index.html
│   └── static/
└── package.json        # Backend dependencies
```

## 🛠️ Technical Stack

- **Frontend**: React (Build files located in `/build` and original file located in `/client`)

- **Backend**: Node.js + Express

- **Database**: SQLite3

- **Routing**: React Router (Client-side) & Express (Server-side)


## 🚀 Getting Started

Since the frontend is already built and stored in the `build` folder, you only need to set up the backend environment.
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
npm run dev
```
Once the server is running, open your browser and navigate to:
`http://localhost:8800`.

## 📖 How it Works

**Data Flow**

1- **Fetching**: On load, the React frontend requests all tasks from the Node.js API.

2- **Storage**: SQLite stores your tasks in a local file (`database.sqlite`), so your data persists even if you restart the server.

3- **Editing**: When you click the Pen, a modal or form appears allowing you to toggle the is completed `status`. This instantly moves the task between the "Todo" and "Done" lists upon saving.

**Navigation**

The app handles "Wrong" URLs by redirecting users to a dedicated **Not Found** page. To return to the main list, simply click the **Title Name** or **Home** link in the navigation bar.
## 🔗 Live Demo

The API is deployed on Render to take advantage of Continuous Deployment (CD). By linking the GitHub repository to Render, any changes pushed to the main branch—whether bug fixes or new features—are automatically built and deployed. This ensures that recruiters and frontend collaborators always have access to the most up-to-date and stable version of the service.

Check out the live API here: [https://todolistapp-ah75.onrender.com/](https://todolistapp-ah75.onrender.com/)


## ☁️ Deployment (Render)

To deploy this app on Render, you should use the provided `render.yaml` file. This allows Render to automatically configure your web service.

1. **The `render.yaml` Configuration**

Create a file named `render.yaml` in your root directory and paste the following:
```bash
services:
  # 1. The Backend (Web Service)
  - type: web
    name: TodoListApp
    runtime: node
    plan: free
    region: Oregon
    buildCommand: npm install
    startCommand: node server.js
    envVars:
      - key: PORT
        value: 3000
      - key: HOST
        value: 0.0.0.0
      - key: NODE_VERSION
        value: 22.22.0
      # You can define your DB path here if your code uses process.env.DB_PATH
      - key: DB_PATH
        value: ./database.sqlite 

  # 2. The Frontend (Static Site)
  - type: web
    name: TodoListAppFrontend
    runtime: static
    # Note: If you use React, the build command is usually 'npm run build' 
    # and the publishPath is usually './build' or './dist'
    buildCommand: npm run build
    staticPublishPath: ./build
    envVars:
      - key: REACT_APP_API_URL
        fromService:
          type: web
          name: TodoListApp
          property: host

# # 3. The Database (PostgreSQL)
# databases:
#   - name: my-app-db
#     plan: free
#     region: ohio
```

2. **Deployment Steps**

    1- Push your code (including the `render.yaml`) to GitHub.

    2- Log in to **Render.com**.

    3- Click **New +** and select **Blueprint**.

    4- Connect your GitHub repository.

    5- Render will read the `render.yaml` and set up your server automatically.

**⚠️ Important: Persistent Data**
On Render's **Free Tier**, the file system is "ephemeral." This means your `database.sqlite` file will be wiped every time the server restarts.

- **For permanent storage**: You must add a **Render Blueprint Disk** to your service or migrate to a managed database like PostgreSQL.

**🌐 Understanding Host Addresses**

- `0.0.0.0` (**The Front Door**): Used in the server code so Render's network can find your app.

- `127.0.0.1` / `localhost` (**The Private Intercom**): Used by your browser to talk safely to your own computer. If your browser doesn't load `0.0.0.0`, it is likely due to OS-level security—stick to `localhost` for local testing.