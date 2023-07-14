# project2

# Develop Instructions

Prereq: Go into the project root and run `npm i` to install the necessary node packages needed for the app to work.

1. Log into MySql first using the command `mysql -u root -p` and enter your password
2. You will now be in the MySql shell. You need to create the schema now for the database, so run the command `source db/schema.sql`. Make sure you have your datbase creds set in a `.env` file located in the root of the project (see the .env.EXAMPLE file to see what the variable names are required).
3. Now that the database is created, you need to seed the DB with the dummy values. Exit the MySql shell, then run the command `npm run seed`.
4. Now that the db is seeded with dummy data, start the app by running `npm run start`
5. Now you can hit the api for example http://localhost:3001/api/users/ will do a GET and show all the users in the database
