const mongoose = require("mongoose");
const Task = require("./models/task.js");

main()
.then((res) => {
    console.log("connection successful");
}) .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
  }

let allTasks = [
  // {
  //   priorityTask: "Invest in yourself",
  //   deadline: "15 September",
  //   date: new Date(),
  // },

  // {
  //   priorityTask: "Start nurturing a startup",
  //   deadline: "15 September",
  //   date: new Date(),
  // },

  // {
  //   priorityTask: "Study and practice BEE",
  //   deadline: "13 September",
  //   date: new Date(),
  // },
   
]

Task.insertMany(allTasks);