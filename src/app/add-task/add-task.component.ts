import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviveService } from '../shared/apiservive.service';
import { TaskModel } from './add-task.module';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  
  formValue!: FormGroup;
  taskModelObj: TaskModel = new TaskModel();

constructor(
  private fb : FormBuilder,
  private apiService : ApiserviveService,
  private route: Router,
  ) {}

ngOnInit(){

  this.formValue = this.fb.group({
    taskName :['',Validators.required],
    taskDetails : ['',Validators.maxLength(100)],
    taskPriority :['',Validators.required],
    completionDate : [ '',Validators.required],
  })
}

postTaskDetails(){
  if(this.formValue.valid){

    this.taskModelObj.taskName = this.formValue.value.taskName;
    this.taskModelObj.taskDetails = this.formValue.value.taskDetails;
    this.taskModelObj.taskPriority = this.formValue.value.taskPriority;
    this.taskModelObj.completionDate = this.formValue.value.completionDate;
    this.taskModelObj.status = "New";
  
    this.apiService.postTask(this.taskModelObj).subscribe(
      {
        next: (data)=>{
          console.log("respose: " +data);
          alert("Task added successfully");
          this.formValue.reset();
          this.route.navigateByUrl('/');
          
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }else{
    alert("Task cannot be add, please fill all required fields");
  }
 
    
}
}