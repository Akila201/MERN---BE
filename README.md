# Simple Blog API Backend

This project provides a basic backend API for a blogging application. It allows users to register, log in, and manage their own blog posts (create, view, edit and delete). Authentication is handled using JSON Web Tokens (JWT).

## Features

*   User registration (email/password)
*   User login with JWT authentication
*   Password hashing using bcrypt
*   Create new blog posts (requires authentication)
*   Retrieve all posts belonging to the logged-in user (requires authentication)
*   Edit specific posts belonging to the logged-in user (requires authentication)
*   Delete specific posts belonging to the logged-in user (requires authentication)

## Technologies Used

*   **Node.js:** JavaScript runtime environment
*   **Express.js:** Web framework for Node.js
*   **MongoDB:** NoSQL database for storing user and post data
*   **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js
*   **jsonwebtoken (JWT):** For generating and verifying authentication tokens
*   **bcrypt:** Library for hashing passwords
*   **dotenv:** For managing environment variables
*   **cors:** For enabling Cross-Origin Resource Sharing

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (which includes npm)
*   [MongoDB](https://www.mongodb.com/try/download/community) (running locally or accessible via a connection string like MongoDB Atlas)

## Installation & Setup

1.  **Clone the repository (or download the code):**
    ```bash
    # If using Git
    git clone <your-repository-url>
    cd Blog---BE
    ```
    (Replace `<your-repository-url>` if applicable, otherwise just navigate to the project directory )

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create Environment Variables:**
    Create a `.env` file in the root directory (`.env`) and add the following variables. **Replace the placeholder values with your actual configuration.**

    ```dotenv
    PORT=5001
    MONGODB_URI=mongodb://localhost:27017/simpleblog # Replace with your MongoDB connection string
    JWT_SECRET=your_very_strong_and_random_jwt_secret_key # Replace with a strong, random secret
    JWT_EXPIRES_IN=1d # Optional: How long tokens should last (e.g., 1d, 7d, 1h)
    ```
    *You can generate a strong `JWT_SECRET` using Node's crypto module:*
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```

4.  **Run the application:**
    *   **Development mode (with auto-restart using nodemon):**
        ```bash
        npm run dev
        ```
    *   **Production mode:**
        ```bash
        npm start
        ```
    The server should now be running on `http://localhost:5001` (or the port specified in your `.env` file).

## API Endpoints

The base URL is `http://localhost:5001/api`

*   **Authentication**
    *   `POST /register`
        *   **Description:** Registers a new user.
        *   **Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
        *   **Response:** `201 Created` with user info and JWT token.
    *   `POST /login`
        *   **Description:** Logs in an existing user.
        *   **Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
        *   **Response:** `200 OK` with user info and JWT token.

*   **Posts (Require Authentication - `Authorization: Bearer <token>` header)**
    *   `GET /posts`
        *   **Description:** Retrieves all posts created by the logged-in user.
        *   **Response:** `200 OK` with an array of post objects.
    *   `POST /posts`
        *   **Description:** Creates a new blog post for the logged-in user.
        *   **Body:** `{ "title": "Post Title", "content": "Post content here." }`
        *   **Response:** `201 Created` with the newly created post object.
    *   `DELETE /posts/:id`
        *   **Description:** Deletes a specific post owned by the logged-in user. Replace `:id` with the actual post ID.
        *   **Response:** `200 OK` with a success message.
    *   `PUT /posts/:id`
        *   **Description:** Updates a specific post owned by the logged-in user. Replace `:id` with the actual post ID.
        *   **Body:** `{ "title": "Updated Title", "content": "Updated content." }`
        *   **Response:** `200 OK` with the updated post object.