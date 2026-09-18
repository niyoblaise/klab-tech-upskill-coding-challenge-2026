# Task Manager Application

A full-stack task management application built with **Spring Boot** and **React (Vite)**. The application provides a RESTful API for managing tasks and a responsive web interface for creating, viewing, updating, searching, filtering, and deleting tasks.

##  Live Demo

| Service         | URL                                                                                    |
| --------------- | -------------------------------------------------------------------------------------- |
| **Frontend**    | [Task Manager Frontend](https://klab-tasks-frontend.vercel.app/)                       |
| **Backend API** | [Backend API](https://klab-backend-xsdf.onrender.com/swagger-ui/index.html)            |
| **Database**    | Neon Serverless PostgreSQL                                                             |

---

##  Features

* Create new tasks
* View all tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed or pending
* Search tasks
* Filter tasks by status
* Task priority levels: **LOW, MEDIUM, HIGH**
* Pagination
* RESTful backend API
* PostgreSQL database persistence
* Responsive user interface
* Dockerized backend
* Cloud deployment

---

##  Tech Stack

### Backend

* **Java 17**
* **Spring Boot**
* **Spring Data JPA**
* **Hibernate**
* **PostgreSQL Driver**
* **Maven**

### Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **JavaScript**
* **Fetch API**

### Infrastructure & Deployment

* **Docker**
* **Render** — Backend deployment
* **Vercel** — Frontend deployment
* **Neon** — Serverless PostgreSQL database

---

##  API Endpoints

The backend exposes the following REST endpoints:

| Method   | Endpoint      | Description         |
| -------- | ------------- | ------------------- |
| `GET`    | `/tasks`      | Get paginated tasks |
| `GET`    | `/tasks/{id}` | Get a task by ID    |
| `POST`   | `/tasks`      | Create a new task   |
| `PUT`    | `/tasks/{id}` | Update a task       |
| `DELETE` | `/tasks/{id}` | Delete a task       |

### Query Parameters

The `GET /tasks` endpoint supports:

```text
?page=0
&size=5
&status=PENDING
&search=meeting
```

Example:

```text
GET /tasks?page=0&size=5&status=PENDING&search=meeting
```

---

##  Database

The application uses **PostgreSQL** for persistent task storage.

Each task contains information such as:

```text
Task
├── id
├── title
├── description
├── status
├── priority
└── createdAt
```

Task statuses:

* `PENDING`
* `COMPLETED`

Task priorities:

* `LOW`
* `MEDIUM`
* `HIGH`

The production database is hosted using **Neon Serverless PostgreSQL**.

---

##  Local Setup

### Prerequisites

Make sure the following are installed:

* Java 17+
* Maven 3.8+ or use the included Maven Wrapper
* Node.js 18+
* npm
* PostgreSQL database

---

### 1. Clone the Repository

```bash
git clone https://github.com/niyoblaise/klab-tech-upskill-coding-challenge-2026
```

### 2. Start the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the application using the Maven Wrapper:

#### Linux / macOS

```bash
./mvnw clean spring-boot:run
```

#### Windows

```bash
mvnw.cmd clean spring-boot:run
```

The backend will be on :

```text
http://localhost:8080
```

---

### 3. Configure Database

Configure the PostgreSQL connection in `application.properties` or through environment variables.

Required environment variables:

```text
DB_URL=jdbc:postgresql://<host>:<port>/<database>
DB_USER=<username>
DB_PASS=<password>
```

---

### 4. Start the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:
```bash
npm install
```
Then run frontend with

```bash
npm run dev
```
