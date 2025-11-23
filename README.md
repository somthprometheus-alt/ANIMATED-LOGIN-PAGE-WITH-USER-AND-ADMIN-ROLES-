User Login Page with Backend (Node.js + MongoDB)

A complete authentication system that includes:

✅ Signup & Login UI (HTML, CSS, JS)
✅ Node.js + Express backend
✅ MongoDB database for user storage
✅ Role-based login redirect (Admin / User)
✅ JWT Token authentication

🚀 Features

User Registration (Name, Email, Password)

Login System with validation

Admin & User redirection

Secure backend with JWT

Fully working API connected to MongoDB

Modern animated frontend

🧩 Project Structure
project-folder/
│
├── frontend/
│   ├── index.html
│   ├── signin.html
│   ├── admin.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── models/User.js
│
└── README.md

⚙️ Backend Setup (Node.js)
1️⃣ Install Node.js

Download from:
https://nodejs.org/

2️⃣ Open backend folder in terminal
cd backend

3️⃣ Install backend dependencies
npm install


Make sure the following packages are installed:

npm install express mongoose cors jsonwebtoken dotenv

4️⃣ Create a .env file

Inside the backend folder:

JWT_SECRET = yoursecretkey123

5️⃣ Start MongoDB

If you have MongoDB Compass or MongoDB locally installed, make sure it is running.

Connection URL used in the project:

mongodb://127.0.0.1:27017/authdb

6️⃣ Start the server

Run:

node server.js


If successful, you will see:

Server running on port 5000
MongoDB Connected

🎨 Frontend Setup

No installation required.

Just open:

frontend/index.html


in your browser.

🔐 Role Based Login
✔ Normal User

Redirect → dashboard.html

✔ Admin User

Redirect → admin.html

You can create an admin manually in MongoDB by adding:

{
  name: "Admin",
  email: "admin@gmail.com",
  password: "admin123",
  role: "admin"
}

🧪 API Endpoints
POST /signup
{
  "name": "user",
  "email": "user@gmail.com",
  "password": "pass123"
}

POST /signin
{
  "email": "user@gmail.com",
  "password": "pass123"
}


Returns:

{
  status: "success",
  token: "xxxx",
  role: "admin/user"
}
