# Notes React App

This react app is designed to simulate the desktop version of the iOS Notes app. It includes the following features:

- Create, read, update and delete folders from a database.
- Create, read, update and delete folders from a database.

## Tech Stack

The following technologies have been used to build up this repository:

- JavaScript Library - React
- State Management - Redux
- Async Middleware - Redux Saga
- UI Framework - Material UI
- Unit Testing - Jest / React Testing Library
- Backend - Node / Express / MySQL

## Setup

In the project directory, run:

```sh
npm install
```

Then, set create a .env file in the root the directory and set environment variables:

```sh
REACT_APP_API_SERVER=http://localhost:8000
DB_HOST=localhost
DB_USER="..."
DB_PASSWORD="..."
```

To run the app in development mode, execute the following command in the project directory to run the backend server locally:

```sh
npm run server
```

Then, open a new terminal tab and execute the following command in the project directory:

```sh
npm start
```

## Testing

Run the following command in the project directory to launch the test runner in watch mode.

```sh
npm test
```

## Building

** TODO **