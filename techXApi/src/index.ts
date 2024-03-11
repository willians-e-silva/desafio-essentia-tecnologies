import express, { Request, Response, NextFunction  } from "express";
import mongoose from "mongoose";
import { getTasks, postTask, updateTask, deleteTask, updateTaskConclusion } from "./database";

import dotenv from 'dotenv';

const app = express();
const port = 3000;
const cors = require('cors');

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB", err);
    });

const taskDateSchema = new mongoose.Schema({
  id: String,
  creation: String,
});

const taskDateModel = mongoose.model("taskLog", taskDateSchema);

app.listen(port, () => {
    console.log(`Application running on port ${port}`)
});

app.get("/getTasks", async (req: Request, res: Response) => {
  try {
    const response = await getTasks();
    res.send(response);
  }catch (err) {
    console.error("error while trying to get the tasks", err);
    throw err; 
  }  
});

app.post("/postTask", async (req: Request, res: Response) => {
  const body = req.body
  const newTaskDate = new taskDateModel({ id: body.id, creation: new Date(Date.now())});
  const saveTaskDate = await newTaskDate.save();
  try {
    postTask(body.id, body.task)
    console.log("task was sussefully posted")
    res.sendStatus(200)
  }catch (err) {
    console.error("error while trying to get the tasks", err);
    throw err; 
  }
})

app.patch("/updateTask", async (req: Request, res: Response) => {
  const body = req.body
  try {
    updateTask(body.task, body.id)
    console.log("task was sussefully updated")
    res.sendStatus(200)
  }catch (err) {
    console.error("error while trying to update the task", err);
    throw err; 
  }
})

app.patch("/updateTaskConclusion", async (req: Request, res: Response) => {
  const body = req.body

  try {
    updateTaskConclusion(body.id)
    console.log("task was sussefully updated")
    res.sendStatus(200)
  }catch (err) {
    console.error("error while trying to update task conclusion", err);
    throw err; 
  }
})

app.delete("/deleteTask", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    deleteTask(body.id)
    console.log("task was sussefully deleted")
    res.sendStatus(200)
  }catch (err) {
    console.error("error while trying to delete the task", err);
    throw err; 
  }
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("An error occurred", err);
  res.status(500).json({ error: "Internal server error" });
});