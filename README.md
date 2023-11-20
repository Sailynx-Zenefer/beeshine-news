# Northcoders News API

## Setup the database
If you wish to clone and run this project, you will have to setup the environment variables that link node PostgreSQL the test and dev databases.
You will need to create two .env files for this project: .env.test and .env.development. 
- into ".env.test" add PGDATABASE=nc_news_test
- into ".env.development" add PGDATABASE=nc_news
That's it, the project should now point to the correct database!