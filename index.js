const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Task = require("./models/task.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

main()
.then((res) => {
    console.log("connection successful");
}) .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
  }

const tasks = [
  {
    priorityTask: "Learn Middleware",
    deadline: "11 September",
    date: new Date(),
  },

  {
    priorityTask: "Make Airbnb project",
    deadline: "13 September",
    date: new Date(),
  },

  {
    priorityTask: "Make a javascript game",
    deadline: "13 September",
    date: new Date(),
  },
]

  
  // // .save()
  // .then((res) => {
  //   console.log(res);
  // }) .catch((err) => console.log(err));

//Login Route
app.get("/login", async (req, res) => {
    res.render("login");
});

//Dashboard Route
app.get("/dashboard", async (req, res) => {
  let tasks = await Task.find();
  res.render("dashboard", {tasks});
  
});

//New Route
app.get("/dashboard/new", (req, res) => {
  res.render("new");
});

//Create Route
app.post("/dashboard", (req, res) => {
  let {priorityTask, deadline} = req.body;
  let newTask = new Task({
    priorityTask: priorityTask,
    deadline: deadline,
    date: new Date(),
  });
  console.log(newTask);
  newTask
  .save()
  .then((res) => {
    console.log(res);
  }) .catch((err) => console.log(err));

  res.redirect("/dashboard");
});

//Edit Route
app.get("/dashboard/:id/edit", async (req, res) => {
  let {id} = req.params;
  let task = await Task.findById(id);
  res.render("edit", {task});
});

//Update Route
app.put("/dashboard/:id", async (req, res) => {
  let {id} = req.params;
  let {priorityTask: newpriorityTask, deadline: newdeadline} = req.body;
  let updatedTask = await Task.findByIdAndUpdate(
    id,
    {priorityTask: newpriorityTask, deadline: newdeadline},
    {runValidators: true, new: true}
  );

  console.log(updatedTask);
  res.redirect("/dashboard");
});

//Destroy Route
app.delete("/dashboard/:id", async (req, res) => {
  let { id } = req.params;
  let deletedTask = await Task.findByIdAndDelete(id);
  console.log(deletedTask);
  res.redirect("/dashboard");
});

app.get("/pastpapers", (req, res) => {
  res.render("dost");
});

app.get("/quizzes", (req, res) => {
  res.render("dost");
});

app.get("/studygroups", (req, res) => {
  res.render("dost");
});

app.get("/studyplans", (req, res) => {
  res.redirect("dost");
});

app.get("/departments", (req, res) => {
  res.render("dost");
});

app.get("/", (req, res) => {
    // res.send("root is working");
    res.redirect("/dashboard");
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});