# Full-Stack Job Portal

A dynamic and modern job board built from the ground up, featuring a responsive React frontend and a robust Django REST Framework backend. This application allows users to browse, search, and view job listings, with a secure JWT-based system for user authentication.





## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)


## Key Features

- **🔍 Live Search:** Instantly filters job postings by title or company on the client-side.
- **🎨 Modern UI/UX:** A premium user interface crafted with Tailwind CSS, featuring a gradient hero section, "glassmorphism" effects, and a fully responsive design.
- **🔐 Secure User Authentication:** Complete user registration, login, and logout functionality using JWT (JSON Web Tokens) with secure httpOnly cookies.
- **📄 Detailed Job View:** A separate, dedicated page for each job with complete information, fetched from the backend API.
- **✨ Polished Loading States:** User-friendly skeleton loaders provide a smooth experience while data is being fetched.
- **RESTful API:** A clean and powerful backend API built with Django and Django REST Framework.

## Tech Stack

A breakdown of the major technologies and libraries used in this project.

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **API Communication:** Axios
- **Icons:** Heroicons

### Backend
- **Framework:** Django & Django REST Framework
- **Authentication:** `dj-rest-auth` & `djangorestframework-simplejwt`
- **Database:** SQLite3 (for development)
- **CORS:** `django-cors-headers`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Python (3.8+)
- Node.js & npm
- Git

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/job-portal-project.git](https://github.com/YourUsername/job-portal-project.git)
    cd job-portal-project
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  **Install backend dependencies:**
    ```bash
    pip install django djangorestframework django-cors-headers dj-rest-auth djangorestframework-simplejwt django-allauth requests
    ```
4.  **Navigate to the backend directory and run migrations:**
    ```bash
    cd job_portal
    python manage.py migrate
    ```
5.  **Run the backend server:**
    ```bash
    python manage.py runserver
    ```
    The backend will be running at `http://127.0.0.1:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory in a new terminal:**
    ```bash
    cd job-portal-ui
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running at `http://localhost:5173`.
