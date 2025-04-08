# Student Course Enrollment System 🧑‍🎓📚

A full-stack Student Course Enrollment System built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This project demonstrates JavaScript and TypeScript interoperability, includes unit testing, and features a full-text search capability.

---

## 🔧 Tech Stack

### 🖥 Backend

- Node.js & Express.js
- JavaScript → gradually migrated to TypeScript
- MongoDB & Mongoose
- Jest for unit testing

### 💻 Frontend

- React.js (Vite)
- React Testing Library & Jest
- TailwindCSS / ShadCN (optional styling library)
- Tanstack Query

---

## 🏗️ Scalable Architecture

This Student Course Enrollment System is designed with scalability in mind. Key considerations include:

- **Modular Backend**: The project structure allows for easy scaling by adding more API endpoints, services, and controllers. As your application grows, you can easily expand with additional features like course categories, user roles, and more.
- **MongoDB Flexibility**: MongoDB's flexible schema allows the database to adapt to changing requirements without complex migrations. Adding new data models or fields is straightforward.

- **TypeScript**: With TypeScript integration, the codebase is more maintainable, safer, and easier to scale by catching errors early during development. Type safety ensures that the backend can scale efficiently with fewer bugs and improved developer experience.

- **Search Optimization**: The search feature uses MongoDB text indexes for efficient querying. As more courses and students are added, the search system can scale with minimal performance degradation.

- **Frontend Scalability**: The frontend is built using React.js with modular components, making it easy to extend and add new views or features. State management is kept simple, ensuring that the app remains performant as the complexity increases.

The system is designed to handle growth—whether adding more students, courses, or features—while maintaining performance and ease of maintenance.

---
```bash
Senior-Fullstack-Exercise/
├── backend/
│ ├── controllers/
│ ├── models/ # JS/TS hybrid models
│ ├── routes/
│ ├── utils/
│ ├── tests/ # Jest tests
│ └── server.ts # Express app
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── lib/
│ │ ├── pages/
│ │ ├── types/
│ │ └── App.tsx
│ │ └── main.tsx
│ ├── vite.config.ts
├── README.md
```
---

## 🚀 Features

### 🔙 Backend

- **JavaScript API Endpoints** (initial setup)
  - Get available courses
- **TypeScript Integration**
  - Converted models and utility functions
  - Enroll student endpoint with type safety
- **Course Search API**
  - Search by course name or description using MongoDB text indexes
- **Validation & Error Handling**
  - Graceful handling of edge cases and bad input
- **Unit Tests**
  - Coverage TS endpoints using Jest

### 🎨 Frontend

- View all available courses
- Search for courses (real-time or triggered search)
- Enroll in courses using a form
- View enrolled courses by student
- UI feedback for loading, success, and errors

### 🗄️ Database Schemas

- **Students**: ID, name, phone, email.
- **Courses**: ID, name, description, capacity, price
- **Enrollments**: student ID, course ID, date

---

## 📦 Installation & Running the App

### Prerequisites

- Node.js v20+
- MongoDB instance (cloud)

### Clone the Repo

```bash
git clone https://github.com/nasfong/Senior-FullStack-Exercise.git
```
