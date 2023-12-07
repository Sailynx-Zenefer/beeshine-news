# Beeshine News API 
:honeybee: :sunny: :newspaper:
## Summary
This project is an API designed to act as the backend for a news/discussion website. Created with node.js, it uses node-express to handle http requests and node-pg to access data contained in a PSQL database.
This was my first extended project completed whilst studying at Northcoders.  

[Click here to see a version of this project hosted online.](https://beeshine-news.onrender.com/api/)

if you wish to setup your own version, please follow these next steps...
## Project Setup
### Minimum requirements for this project
Before setting up this project ensure your Node.js and Postgres versions are up to date.
This project requires...
- PostgreSQL v15.5.0
- Node.js v21.1.0
### Cloning project repository
First, you'll need to clone this repository. Open a terminal, navigate to the directory in which you wish to install this project and enter this command :

```
git clone https://github.com/Sailynx-Zenefer/beeshine-news/
```
### Creating database environment variables
For this project to be able to create, seed and access the PSQL database you will have to setup the environment variables that link node PostgreSQL to the test and dev databases.

You will need to create two `.env` files that each contain an environment variable. Navigate into /beeshine-news/ and...

into | `.env.test` | write...
```
PGDATABASE=nc_news_test
``` 
into |`.env.development` | write...
```
PGDATABASE=nc_news
``` 
Once you've saved these files, the project should now point to the correct databases.

### Install Dependancies
Next, you'll need to install dependencies for the project. Ensure you are currently in /beeshine-news and enter this command into your terminal: 
```
npm install
```
This will automatically install all the packages required for this project.

### Seeding the local database
You should now be ready to create and seed your databases. Ensure you are still in /beeshine-news and enter this command to setup the databases:
```
npm run setup-dbs
```
Next, enter this command to seed the databases:
```
npm run seed
```

Well done, the API is now ready to test or run locally. 
### Testing the database using jest & supertest
To ensure everything is running as intended, you can run the project using in a test environment, using a test database and the jest tests written for this project. 

To do so, you'll need to install some dev dependencies with the following command :
```
npm install jest jest-extended jest-sorted supertest -D
```
Once these are installed, you can run the tests anytime by using this command:
```
npm test app.test.js
```
### Running local development version of this project
if you wish to setup and interact with a local version of the project, please enter this command to start the server:
```
npm run start
```
You can then access it by accessing http://localhost:9090/api/, using your favourite browser or API testing software