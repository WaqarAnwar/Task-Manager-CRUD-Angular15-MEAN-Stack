import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from './tasks.service';
import { Task } from './schema/tasks';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers:[TasksService]
})
export class TasksComponent {
  tasks: Task[]=[];
  task: Task = new Task;
  _id:string='';
  task_name:string='';
  complete:boolean=false;
constructor(private taskService:TasksService){

}

ngOnInit(){
this.viewTasks();

}

viewTasks(){
  this.taskService.getTasks().subscribe({
    next: (data:any) => {
      this.tasks = data;
      console.log(data);
    },
    error: (e:any) => console.error(e)
  });
}

viewTask(id:any){
 //var tasks=this.tasks;
this.taskService.viewTask(id).subscribe({next:(data:any)=>{
  this.task=data;
  this._id=this.task._id;
  this.task_name=this.task.task_name;
  this.complete=this.task.complete;
}})
}


addeditTask(addoredit:any){

  const newTask={
    task_name:this.task_name,
    complete:this.complete
  }
  if(this._id=='0'){
    //this.taskService.addTask(newTask).subscribe(({task})=>{this.tasks.push(task);})
    this.taskService.addTask(newTask).subscribe(data=>alert('Task added'));
  }
  else {
    this.taskService.updateTask(this._id,newTask).subscribe(data=>alert('Task updated'));
  }

}


deleteTask(id:any){
  var tasks=this.tasks;
this.taskService.deleteTask(id).subscribe(data=>{
 // if(data.n==1){
    for (var i=0;i<tasks.length;i++){
      if(tasks[i]._id==id){
        tasks.splice(i,1);
      }
   // }
  }
})
}

reloadpage(){
  window.location.reload();
}

}
