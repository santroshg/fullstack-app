

Run your mongo instance locally, as for example:
```
$ sudo mongod --dbpath /data/test/ --port 27017
```
Notes: this is important to be done before installing the dependencies so the script to populate the database with sample data can connect to mongo.

Create a `.env` file with the authentication secret in the root of the backend folder (check `backend/.env.example`).
```
AUTH_SHARED_SECRET=my-auth-shared-secret-hash-here
```

Install dependencies:
```
$ yarn install
```

Launch the application:
```
$ yarn start
```
