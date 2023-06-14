import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviveService } from '../shared/apiservive.service';
import { MatTableDataSource } from '@angular/material/table';

import { TaskModel } from '../add-task/add-task.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasksList:TaskModel[]=[];
   completed :boolean=false;
   status:any;
  displayedColumns = [
  'id',
    'tasksname',
    'taskDetails',
    'taskpriority',
    'completionDate',
    'status',
    'updateStatus',
    'action',
  ]
  taskModelObj: TaskModel = new TaskModel();
  

  //  dataObj: TaskModel[]=[];
  dataSource = new MatTableDataSource<any>(this.tasksList);
  constructor(
    private _router: Router,
    private apiService : ApiserviveService
    ){}

  
  ngOnInit() {
   this.getAllTasks();

 }
 updateStatus(element:any){
  if(element.completed){
    element.status = "completed";
  }else{
    element.status = "Pending";
  }
 }

  getAllTasks(){
    this.apiService.getAllTask().subscribe({
      next:(data)=>{
        if(data){
          console.log(data)
          
          data.forEach((element:{
            id:Number;
            taskName:string;
            taskDetails:string;
            taskPriority:string;
            completionDate:string;
            status:string
          } )=> {
            
            this.taskModelObj = new TaskModel();
  
            this.taskModelObj.id = element.id,
            this.taskModelObj.taskName = element.taskName,
            this.taskModelObj.taskDetails = element.taskDetails,
            this.taskModelObj.completionDate = element.completionDate,
            this.taskModelObj.status = element.status
         
            // this.taskModelObj.taskPriority = element.taskPriority
            if(element.taskPriority == '1'){
              this.taskModelObj.taskPriority = 'High';
  
            }else if(element.taskPriority == '2'){
              this.taskModelObj.taskPriority = 'Medium';
            }else if(element.taskPriority == '3'){
              this.taskModelObj.taskPriority = 'Low';
            }
  
          this.tasksList.push(this.taskModelObj);
         
          });
          console.log(this.tasksList);
          this.dataSource.data = this.tasksList;
       
  
          
          }
          
      }
    });
  }
  deleteTask(element:any){
  this.apiService.deleteTask(element.id).subscribe({
    next : (data)=>{
    alert("Task Deleted Successfully");
    this.getAllTasks(); 
    },
    error:(error)=>{
      console.log(error);
    }
  })

}

editTask(element:any){
 
  let id = element.id;
  this._router.navigate(['/edit-task/', element.id], {state:{data:element}});


}

}

