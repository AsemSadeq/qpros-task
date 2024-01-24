# Next.js Login Page

This project demonstrates a basic login page using Next.js.

## Features

- **Login Form**: A simple login form with validations for email and password fields:
  -   Email and password are required.
  -   Email should be a valid email pattern.
  -   Password should be at least 8 characters. 
- **Authentication**: Uses JWT (JSON Web Tokens) for user authentication.
    - Session is maintained by save the token in the cookies for `One Day`.
- **Protected Route**: Redirects users to the login page if they attempt to access a protected route without authentication.

## Tech Stack

- [Next.js](https://nextjs.org/): A React framework for building web applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [CSS Modules](https://github.com/css-modules/css-modules): For styling.
- [Node.js](https://nodejs.org/): A JavaScript runtime for server-side development.
- [MongoDB](https://www.mongodb.com/): A NoSQL database for storing data.
- [JSON Web Tokens (JWT)](https://jwt.io/): A standard for creating access tokens.

## Prerequisite
-  MongoDB installed locally
-  Node
-  npm

## Getting Started

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/AsemSadeq/qpros-task.git
    cd qpros-task
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**:

    Create `.env` file in the root directory and add fill it with same variables in the `.env.sample`

4. **Run the Application**:

    ```bash
    npm run dev
    ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

5. **Open in Browser**:

    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000\login) to see the login page.

6. **Try to use any of thess users to login**:
  
    ```
  	{
  		email: 'test@gmail.com',
  		password: '12345678',
  	},
  	{
  		email: 'admin@gmail.com',
  		password: '12345678',
  	}
    ```
