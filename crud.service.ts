import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient) { }
  insertStudent(formData:any):Observable<any>{
    return this.http.post('http://localhost/crud_app/insert.php',formData)
  }
  getStudentList():Observable<any>{
    return this.http.get('http://localhost/crud_app/getStudent.php')
  }
  updateStudent(formData:any):Observable<any>{
    return this.http.put('http://localhost/crud_app/updateStudent.php',formData)
  }
  deleteStudent(rollNo:any):Observable<any>{
    console.log(rollNo)
    return this.http.delete('http://localhost/crud_app/deleteStudent.php?rollNo='+rollNo)
  }
}
