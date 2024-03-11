import { pool } from "./pool";

export async function getTasks(){
    try {
        const result = await pool.query(`SELECT * FROM tasks`);
        console.log("query completed");
        return result[0];
    } catch (err) {
        console.error("error executing query", err);    
        throw err; 
    }
}

export async function getTaskByID(id: String){
    try {
        const result = await pool.query(`SELECT * FROM tasks WHERE ?`, [id]);
        console.log("query completed");
        return result[0];
    } catch (err) {
        console.error("error executing query", err);    
        throw err; 
    }
}

export async function postTask( id: number, task: String){
    try {
        await pool.query(`INSERT INTO tasks (id, task) VALUES (?,"?")`, [id, task]);
    } catch (err) {
        console.error("error executing query", err);
        throw err; 
    }
}

export async function updateTask( task: String, id: String){
    try {
        await pool.query(`UPDATE tasks SET task = ? WHERE id = ?`, [task, id]);
    } catch (err) {
        console.error("error executing query", err);
        throw err; 
    }
}

export async function updateTaskConclusion( id: String){
    try {
        await pool.query(`UPDATE tasks SET conclusion = NOT conclusion WHERE id = ?`, [id]);
    } catch (err) {
        console.error("error executing query", err);
        throw err; 
    }
}

export async function deleteTask( id: String){
    try {
        await pool.query(`DELETE FROM tasks WHERE id = ?`, [id]);
    } catch (err) {
        console.error("error executing query", err);
        throw err; 
    }
}