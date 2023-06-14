import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule} from "@angular/material/table";
import { MatPaginatorModule} from "@angular/material/paginator";
import { FeatherModule } from 'angular-feather';
import {Edit, Delete, ArrowLeft} from 'angular-feather/icons';
import {MatIconModule} from '@angular/material/icon';
import swal from 'sweetalert2';
import { from } from 'rxjs';


 const icons = {
  Edit, Delete, ArrowLeft
 };


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    EditTaskComponent,
    DashboardComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FeatherModule.pick(icons),
    
  
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
