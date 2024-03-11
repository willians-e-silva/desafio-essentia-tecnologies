import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherAirplay, featherCheckSquare, featherEdit, featherFilePlus, featherPlusSquare, featherXSquare } from '@ng-icons/feather-icons';
import { heroCog6Tooth, heroUsers } from '@ng-icons/heroicons/outline';

import { HttpClient } from '@angular/common/http';


interface Task {
  id: any;
  task: string;
  conclusion: any;
  isEditing: null;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  viewProviders: [provideIcons({ featherAirplay, heroUsers, featherFilePlus, featherEdit, featherXSquare, featherCheckSquare, featherPlusSquare, heroCog6Tooth })]
})


export class TodoComponent{
  @ViewChild('inputRef', { static: false }) inputRef!: ElementRef;
  @ViewChild('updateRef', { static: false }) updateRef!: ElementRef;

  tasks: Task[] = [];
  isEditing = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/getTasks').subscribe(
      data => {
        this.tasks = this.createTaskList(data);
      },
      error => {
        console.error('Error fetching JSON data', error);
      }
    );
  }

  createTaskList(taskData: any[]): Task[] {
    return taskData.map(data => ({
      id: data.id,
      task: data.task.replace(/'/g, ''),
      conclusion: !!data.conclusion,
      isEditing: null
    }));
  }

  async addTask(){
    const timestamp: Number = Date.now();
    const taskInput = await this.inputRef.nativeElement.value
    const newTask: Task = {
      id: this.tasks.length,
      task: taskInput,
      conclusion: 0,
      isEditing: null
    };
    try{
      this.tasks.push(newTask);
      await this.http.post('http://localhost:3000/postTask', { id: timestamp, task: taskInput }).toPromise();
    }catch (error){
      console.error('Error adding task:', error);
    }
  }

  async removeTask(id: any) {
    const element = document.getElementById(id);
    try {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
      await this.http.delete('http://localhost:3000/deleteTask', { body: { id: id } }).toPromise();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  }
  
  async checkTask(task: any) {
    console.log(task.conclusion)
    try{
      if (task.isEditing) {
        const taskInput = this.updateRef.nativeElement.value
        task.task = taskInput
        console.log(taskInput)
        await this.http.patch('http://localhost:3000/updateTask', { id: task.id, task: taskInput}).toPromise();
      }
    }catch{}
    task.isEditing = !task.isEditing;
  }

  async toggleCheck(task: any) {
    console.log(task.conclusion) 
    try{
        await this.http.patch('http://localhost:3000/updateTaskConclusion', { id: task.id, conclusion: !task.conclusion}).toPromise();
    }catch{}
    task.conclusion = !task.conclusion
  }



}