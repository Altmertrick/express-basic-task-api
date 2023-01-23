const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

const connectDB = require('./db/connect');
require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

app.use(express.static('./public'));

//middleware
//applying urlencoded to read data from req obj
app.use(express.urlencoded({ extended: false }));
//applying this to parse json data from on req object
app.use(express.json());

//routes
app.use('/api/v1/tasks', tasksRouter);

//Handling not Found:
// app.all('*', (req, res) => {
//   res.status(404).send(`<h1>Rout "${req.url}" does not exist</h1>`);
// });
app.use(notFound);

app.use(errorHandler);

//app.get('/api/v1/tasks')         - get all the tasks
//app.post('/api/v1/tasks')        - create a new tasks
//app.get('/api/v1/tasks/:id')     - get a single task
//app.patch('/api/v1/tasks/:id')   - update a single task
//app.delete('/api/v1/tasks/:id')  - delete a single task

const port = process.env.PORT || 5000;

//we need to spin up to the server after connection to the db
//cause there is no purpose to spin up the server without connection to the db
//we encapsulated connection logic via mongoose in the function connectDB
//and created start function, where we can first check if there're any errors
//while the connecting to the db and then we spin up our server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
