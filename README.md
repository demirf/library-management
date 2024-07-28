# Library Management Application

## Installation

### Step 1: Install Dependencies

Open a terminal in the project directory and run the following command to install the necessary packages:

```bash
npm install
```

### Step 2: Environment Variables

Check the .env.example file and create a new .env file. Update the values in the .env file as needed. Example:

```bash
cp .env.example .env
```

Edit the .env file to match your configuration.

### Step 3: Run Migrations

To set up the database schema, run the following command:

```bash
npm run migrate:run
```

### Step 4: Start the Application

```bash
npm run dev
```

### Step 5: Testing the Case Study

Once the application is running, you can test the various endpoints as per your requirements.

## Available Endpoints
- List Users: GET /users
- Get User Info: GET /users/:id
- Create User: POST /users
- Update User: PUT /users
- List Books: GET /books
- Get Book Info: GET /books/:id
- Create Book: POST /books
- Update Book: PUT /books
- Borrow Book: POST /users/:userId/borrow/:bookId
- Return Book: POST /users/:userId/return/:bookId

## Project Structure
- src/entities: Contains the TypeORM entity definitions.
- src/migrations: Contains the database migration files.
- src/services: Contains the service classes for handling business logic.
- src/controllers: Contains the controller classes for handling HTTP requests.
- src/routes: Contains the route definitions.
- src/config: Contains the database configuration.
