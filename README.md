# Book Store Project

A full stack Book Store application built using the MERN stack. The project provides a RESTful API for managing books and a modern React frontend for browsing, adding, editing, and deleting books — now with rich book details like descriptions, story previews, genres, and cover images.

---

## Project Duration

**June 2024 – July 2024**

---

## Features

* Create, update, view, and delete books using REST APIs
* Rich book records with description, genre, page count, story preview, and cover image
* Generated SVG book covers so every seeded book ships with distinct artwork
* Modular backend architecture with clean route and model separation
* Responsive and interactive frontend with card, table, and modal views
* Reusable UI components for better scalability

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* REST API
* CORS
* dotenv (environment configuration)

### Frontend

* React.js
* Vite
* React Router
* Tailwind CSS
* Axios
* Notistack (toast notifications)
* React Icons

---

## Project Structure

```
Book Store Project/
├── Backend/              # Express REST API
│   ├── models/           # Mongoose schemas (Book)
│   ├── routes/           # Books CRUD routes
│   ├── seed/             # Demo library seeder + SVG cover generator
│   ├── config.js         # Environment configuration
│   ├── .env.example      # Environment variable template
│   └── index.js          # Server entry point
└── frontend/             # React + Vite client
    └── src/
        ├── pages/        # Home, ShowBook, CreateBooks, EditBook, DeleteBook
        └── components/   # Navbar, cards, table, modal, form fields, spinner
```

---

## Backend Highlights

* Implemented RESTful CRUD APIs to manage book records
* Whitelists and sanitizes incoming payloads so clients can only write supported fields
* Validates required fields (title, author, publishYear) before saving
* Extended book schema with description, story, genre, page count, and cover image
* Applied CORS configuration to enable secure cross origin communication
* Environment based configuration via dotenv with fail-fast validation of required variables

---

## Frontend Highlights

* Built a single page application using React Router
* Book card, table, and modal views for flexible browsing
* Client side image resizing so covers upload as compact base64 data URLs
* Integrated Axios for seamless API communication
* Interactive toast alerts and smooth UI flow

---

## Getting Started

### Prerequisites

* Node.js (v18+)
* A MongoDB connection string (local instance or MongoDB Atlas)

### 1. Backend setup

```bash
cd Backend
npm install
cp .env.example .env      # Windows: copy .env.example .env — then set MONGODB_URL
npm run seed              # optional: load the demo book library
npm start
```

The API runs on `http://localhost:3000` (configurable via `PORT` in `Backend/.env`).

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env      # Windows: copy .env.example .env — then set VITE_API_URL
npm run dev
```

The client runs on `http://localhost:5173` by default.

---

## API Endpoints

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/books`       | List all books (newest first)  |
| GET    | `/books/:id`   | Get a single book by id        |
| POST   | `/books`       | Create a new book              |
| PUT    | `/books/:id`   | Update an existing book        |
| DELETE | `/books/:id`   | Delete a book                  |

**Required fields** for create/update: `title`, `author`, `publishYear`.
**Optional fields**: `description`, `story`, `coverImage`, `genre`, `pages`.

---

## Seeding

Run `npm run seed` inside `Backend/` to load a demo library of books, each with a generated SVG cover, description, and story preview. Seeding **upserts by title + author**, so books you add through the app are never lost when re-seeding.

---

## Future Improvements

* User authentication and authorization
* Search and filter functionality
* Pagination and sorting
* Admin dashboard

---

⭐ If you find this project useful, consider giving it a star on GitHub!


