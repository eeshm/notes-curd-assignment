# Notes App with Next.js (App Router)

A simple Notes App built using **Next.js (App Router)**. This app includes CRUD functionality (Create, Read, Update, Delete) for managing notes and uses **Prisma** ORM with a **PostgreSQL** database for data storage.

---

## Features
- Create, read, update, and delete notes.
- Responsive design with a simple and clean UI.
- JWT-based authentication.
- Easy deployment with Vercel or other cloud platforms.

---

## Tech Stack
- **Frontend**: Next.js (App Router)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (with Prisma ORM)
- **Authentication**: JWT (JSON Web Token)
- **CSS Framework**: Tailwind CSS (or optional custom styling)

---

## Project Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or above)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) or npm
- [PostgreSQL](https://www.postgresql.org/) (or use a cloud database like ElephantSQL)
- [Prisma](https://www.prisma.io/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-notes-app.git
cd nextjs-notes-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3.Set Up Environment Variables
```bash 
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE_NAME>?schema=public"
JWT_SECRET="your-jwt-secret"
```
### 4.Set Up Prisma and Migrate Database
```bash 
npx prisma migrate dev --name init
```
### 5. Run the Development Server
```bash
npm run dev
```


# Authentication

This application uses JWT-based authentication.

Sample User Credentials:

Username: Test123@gmail.com
Password: 123456

These credentials are pre-configured for testing. You can authenticate the user through the app's login form, and once logged in, you can perform CRUD operations on notes.



