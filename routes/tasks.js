const express = require('express');
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('./../controllers/tasks');

const router = express.Router();

//base url: /api/v1/tasks

router.get('/', getAllTasks);

router.post('/', createTask);

router.get('/:id', getTask);

//for updating task we use PATCH method
//PUT VS PATCH
// when you use PUT you're trying to replace the existing recourse
// meaning you can overwrite existing properties
// PATCH is for partial update of the props that you passed in the body
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
