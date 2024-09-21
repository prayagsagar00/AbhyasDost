const express = require("express");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    priorityTask: {
        type: String,
        required: true,
    },

    deadline: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;