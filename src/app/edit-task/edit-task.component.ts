import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiserviveService } from '../shared/apiservive.service';
import { TaskModel } from '../add-task/add-task.module';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  formValue!: FormGroup;
  rowId:any;
  rowData:any[]=[];
  taskModelObj: TaskModel = new TaskModel();
  id:any;
  taskName:any;
  taskDetails:any;
  taskPriority:any;
  status:any;
  completionDate:any;


  constructor(  
    private fb : FormBuilder,
    private apiService : ApiserviveService,
    private route: Router,
    private activateRoute: ActivatedRoute,){
  }
  ngOnInit(): void {
    this.formValue = this.fb.group({
      taskName :['',Validators.required],
      taskDetails : ['', Validators.maxLength(100)],
      taskPriority :['', Validators.required],
      completionDate : [ '', Validators.required],
    })

   this.rowId = this.activateRoute.snapshot.params['id'];
    console.log(parseInt(this.rowId));
   this.getTaskData();
  }
  getTaskData(){
    this.apiService.getTaskById(parseInt(this.rowId)).subscribe({
      next: (data) => {
         // Process the retrieved task data as needed
         console.log(data);
         this.rowData.push(data);
         this.id=data.id;
         this.taskDetails= data.taskDetails;
         this.taskName= data.taskName;
         this.taskPriority= data.taskPriority;
         this.status = data.status;
         this.completionDate = data.completionDate;
       },
      error: (error) => {
         // Handle error if the API call fails
         console.error(error);
       }
     }
     );
 
  }

  updateTask(){
 if(this.formValue.valid){
  this.taskModelObj.taskName = this.formValue.value.taskName;
  this.taskModelObj.taskDetails = this.formValue.value.taskDetails;
  this.taskModelObj.taskPriority = this.formValue.value.taskPriority;
  this.taskModelObj.completionDate = this.formValue.value.completionDate;

  this.apiService.updateTask(this.taskModelObj,this.rowId).subscribe({
    next:(data)=>{
      
      console.log(data);
      alert("Task Updated Successfully");
      this.formValue.reset();
      this.getTaskData();
      
       this.route.navigateByUrl('/');
    },
    error:(error)=>{
      console.log(error);
    }
    
  })
 }else{
  alert("Task cannot be update, please fill all required fields");
 }
  }

}