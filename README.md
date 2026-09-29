<div align="center">

# 🦾 VIRTUAL AUTONOMOUS ROBOT

### A Browser-Based 6-Axis Robotic Arm Simulation & Control Platform

<p>
  <strong>Python Robotics • FastAPI • React • TypeScript • Three.js • Forward Kinematics</strong>
</p>

<br>

<img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white">
<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Three.js-3D%20Simulation-black?style=for-the-badge&logo=three.js&logoColor=white">

<br><br>

**A virtual robotics laboratory running directly in the browser.**

</div>

---

## ✦ Overview

**Virtual Autonomous Robot** is a browser-based robotic arm simulator designed to explore robotic control, kinematics, 3D visualization, and eventually autonomous robot behavior.

The project combines a **Python robotics backend** with a **React + Three.js 3D simulation environment**. Joint commands are sent from the browser to a FastAPI backend, where the robot state is validated and forward kinematics are calculated.

The goal is to gradually evolve the simulator from simple joint control into a complete robotics experimentation environment.

---

## ✦ Current Features

- 🦾 6-axis robotic arm simulation
- 🎮 Interactive joint controls
- ➕ / ➖ individual joint control
- 🎚️ Joint sliders
- 🏠 Home position
- 🧮 Forward kinematics
- 📐 Denavit-Hartenberg transformation matrices
- 🐍 Python robotics backend
- ⚡ FastAPI REST API
- ⚛️ React + TypeScript frontend
- 🌐 Browser-based 3D visualization
- 🎨 Three.js / React Three Fiber rendering
- 🔄 Real-time frontend ↔ backend communication
- 🧠 Centralized robot state
- 📡 Vite development proxy
- 📚 Automatic FastAPI Swagger documentation

---



```text


# ✦ Architecture



                    BROWSER
┌──────────────────────────────────────────────┐
│                                              │
│              React + TypeScript              │
│                                              │
│              Three.js / R3F                  │
│                                              │
│       ┌──────────────────────────────┐       │
│       │     3D Robotic Arm           │       │
│       │                              │       │
│       │ J1  J2  J3  J4  J5  J6       │       │
│       └──────────────────────────────┘       │
│                       │                      │
│                  Joint Controls              │
│                       │                      │
└───────────────────────┼──────────────────────┘
                        │
                     REST API
                        │
                        ▼
┌──────────────────────────────────────────────┐
│                 FastAPI                      │
│                                              │
│              Robot Controller                │
│                       │                      │
│                       ▼                      │
│                 RobotArm                     │
│                       │                      │
│              Joint Validation                │
│                       │                      │
│                       ▼                      │
│             Forward Kinematics               │
│                       │                      │
│                       ▼                      │
│              End-Effector Pose               │
└──────────────────────────────────────────────┘











Technology Stack


| Technology            | Purpose                                    |
| --------------------- | ------------------------------------------ |
| **React**             | User interface                             |
| **TypeScript**        | Type-safe frontend development             |
| **Vite**              | Frontend development server and build tool |
| **Three.js**          | 3D rendering                               |
| **React Three Fiber** | React renderer for Three.js                |
| **@react-three/drei** | Three.js helpers and components            |
| **CSS**               | Interface styling                          |



Backend


| Technology   | Purpose                                      |
| ------------ | -------------------------------------------- |
| **Python**   | Robotics logic                               |
| **FastAPI**  | REST API                                     |
| **Uvicorn**  | ASGI server                                  |
| **Pydantic** | API request validation                       |
| **NumPy**    | Matrix operations and numerical calculations |






Project Structure



virtual-autonomous-robot/
│
├── backend/
│   ├── __init__.py
│   ├── main.py
│   │
│   └── robotics/
│       ├── __init__.py
│       ├── joint.py
│       ├── kinematics.py
│       ├── robot.py
│       └── test_robot.py
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.ts
│
├── requirements.txt
├── .gitignore
└── README.md


















Backend Setup

Make sure Python 3.x is installed.

Create a virtual environment:

Windows
python -m venv .venv

Activate it:

.venv\Scripts\activate
Linux / macOS
python3 -m venv .venv

Activate it:

source .venv/bin/activate

Install the dependencies:

pip install -r requirements.txt

Start the FastAPI server:

uvicorn backend.main:app --reload

The backend will be available at:

http://localhost:8000
✦ API Documentation

FastAPI automatically provides interactive API documentation.

Open:

http://localhost:8000/docs

Available endpoints currently include:

GET  /
GET  /robot/state
POST /robot/joint
POST /robot/home
Example joint command
{
  "joint": 0,
  "angle": 30
}

This commands:

J1 → 30°
✦ Frontend Setup

Open a new terminal while keeping the backend running.

Enter the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

For Codespaces or other remote development environments, use:

npm run dev -- --host 0.0.0.0

Vite will provide a local development URL similar to:

http://localhost:5173

Open that URL in your browser.

✦ Running the Complete System

You need two terminals.

Terminal 1: Backend
cd virtual-autonomous-robot

uvicorn backend.main:app --reload
Terminal 2: Frontend
cd virtual-autonomous-robot/frontend

npm install

npm run dev

Then open the frontend URL.















✦ Development Roadmap

The project is being developed incrementally.

Completed
 Project architecture
 6-axis robot model
 Joint abstraction
 Joint limits
 DH kinematics
 Forward kinematics
 Python robot controller
 FastAPI backend
 REST API
 React frontend
 Three.js 3D visualization
 Interactive joint controls
 Frontend/backend communication
 Home position