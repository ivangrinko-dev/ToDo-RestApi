const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todo_restapi');

const Table = mongoose.model('tasks', {
    title: String,
    description: String,    
});

const ObjectId = mongoose.Types.ObjectId;

module.exports = { Table, ObjectId };