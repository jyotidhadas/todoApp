import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiserviveService {
base_url = "http://localhost:3000/tasks/"
  constructor(private http: HttpClient) { }

  postTask(data:any){
    return this.http.post<any>(this.base_url,data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  getAllTask(){
    return this.http.get<any>(this.base_url)
    .pipe(map((res:any)=>{
      return res;
    }))
};

getTaskById(id:Number){
  return this.http.get<any>(this.base_url+id)
  .pipe(map((res:any)=>{
    return res;
  }));
}

  updateTask(data:any,id:number){
    return this.http.put<any>(this.base_url+id, data)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

deleteTask(id:number){
    return this.http.delete<any>(this.base_url+id)
    .pipe(map((res:any)=>{
      return res;
    }));
  }
}


