const asyncWrapper = require('../middleware/async-wrapper');
const { createCustomError } = require('../errors/custom-error');

const Task = require('./../models/Task');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // try {
  //   const tasks = await Task.find({});
  //   res.status(200).json({ tasks });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create({
    name: req.body.name,
    completed: req.body.completed,
  });
  //status 201 - successful post request
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createCustomError('Task is not found', 404));

    //Here we create an error manually
    //Also we can create a class for creating errors
    // const error = new Error('Task is not found');
    // error.status = 404;
    // next(error)

    //return res.status(404).json({ msg: `Task with id: ${id} do not exist` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id },
    { name, completed },
    //new: true - means that method will return a new task
    //by default it returns the old item that was updated
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(createCustomError(`task with id: ${id} does not exist`, 404));
    //return res.status(404).json({ msg: `task with id: ${id} does not exist` });
  }
  res.status(200).json({ task });
});

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    if (!deleteTask) {
      return next(createCustomError(`Task with id: ${id} does not exist`, 404));
    }
    res.status(200).json({ data: deletedTask, msg: 'task was deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
