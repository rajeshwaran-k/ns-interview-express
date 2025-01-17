## Tasks:

- User Registration - Completed
- Login API (Token Generation) - Completed
- Authenticated Chat Import via Excel Sheet - Completed

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

- Application will be running in port 3000
- Import `postman-sample-request.json` into your Postman application (Avaialble in this repo).You will be able to see sample requests for login, signup and upload.

> [!NOTE]
> The value for `Sender Email` in excel file should be a registered user.

- Sample sheet is available in this repository named `sample-sheet.xlsx` incase if the postman collection file is not accesible.
