import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpType } from './employee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }

  insertdata(data:EmpType){
   return this.http.post('http://localhost:3000/employee',data)
  }

  getData():Observable<EmpType[]>{
    return this.http.get<EmpType[]>('http://localhost:3000/employee');
  }

  deleteData(id:string){
    console.log(id);
    
    return this.http.delete(`http://localhost:3000/employee/${id}`)
  }

  editData(id:string):Observable<EmpType>{
    return this.http.get<EmpType>(`http://localhost:3000/employee/${id}`)
  }

  updateData(id:string,val:EmpType){
    return this.http.put(`http://localhost:3000/employee/${id}`,val)
  }
}
