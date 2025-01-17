## Tasks:

- User Registration - Completed
- Login API (Token Generation) - Completed
- Authenticated Chat Import via Excel Sheet - Completed

## Major Technologies Used:

- MySQL: Database
- Node.js with Express: Backend framework
- MikroORM: ORM for database operations
- TypeScript: For type-safe development
- Multer and xlsx : File upload handling and processing
- class-validator: Input validation
- JWT: Authentication

## Setting up

- After clonning the application run

```bash
npm i
```

- create .env and add following values with your DB credentials and Secret,

```bash
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
JWT_SECRET_KEY
```

- Execute follwing command to run migartion

```bash
npx mikro-orm migration:up
```

- Start the application by following command

```bash
npx ts-node src/index.ts
```

- Application will be running on port 3000
- Import `postman-sample-request.json` into your Postman application (Avaialble in this repo).You will be able to see sample requests for login, signup and upload.

> [!NOTE]
> The value for `Sender Email` in excel file should be a registered user.

- Sample sheet is available in this repository named `sample-sheet.xlsx` incase if the postman collection file is not accesible.
