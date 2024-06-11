import { CommonModule, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,NgFor,CommonModule,NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
    show:boolean=false;
    show1:boolean=false;
    studentArr:any=[]
    operationTitle:string='Add Student'
    isDisabled=false
    constructor(private service:CrudService){
      this.getStudents();
    }
    showPop(){
      this.show=!this.show
      this.isDisabled=false
      this.clearForm()
      this.operationTitle="Add Student"
    }
    fb:FormGroup=new FormGroup({
      rollNo:new FormControl('',Validators.required),
      fullName:new FormControl('',Validators.required),
      emailId:new FormControl('',Validators.required),
      dob:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required),
      gender:new FormControl('',Validators.required),
      fees:new FormControl('',Validators.required)
    })
    clearForm(){
      this.fb.controls['rollNo'].setValue('')
      this.fb.controls['fullName'].setValue('')
      this.fb.controls['emailId'].setValue('')
      this.fb.controls['dob'].setValue('')
      this.fb.controls['mobile'].setValue('')
      this.fb.controls['gender'].setValue('')
      this.fb.controls['fees'].setValue('')
    }
    onSubmit(){
      if(this.operationTitle=="Add Student"){
        if(this.fb.valid){
          this.service.insertStudent(this.fb.value).subscribe({
            next:(val:any)=>{
              alert('Student Added Successfully !!')
              this.clearForm();
              setTimeout(()=>{
                this.show=!this.show
                this.getStudents()
              },1500)
            },
            error(err){
              alert('Error')
              console.log(err)
            }
          })
        }else{
          alert('All fields are required !!')
        }
      }else{
        this.service.updateStudent(this.fb.value).subscribe({
          next:(val:any)=>{
            alert('Student updated successfully !!')
            this.clearForm();
            setTimeout(()=>{
              this.show=!this.show
              this.getStudents()
            },800)
          },error(err){
            console.log(err)
          }
        })
      }
    }
    getStudents(){
      this.service.getStudentList().subscribe({
        next:(response:any)=>{
          this.studentArr=response.students
          console.log(this.studentArr)
        }
      })
    }
    onDelete(rollNo:any){
      this.service.deleteStudent(rollNo).subscribe({
        next:(val:any)=>{
          alert("Student deleted successfully !!")
          this.getStudents()
        },error(err){
          console.log(err)
        }
      })
    }
    onEdit(rollNo:any){
      this.show=!this.show
      this.operationTitle="Update Student"
      this.isDisabled=true
      for(let index = 0; index< this.studentArr.length; index++){
        const element = this.studentArr[index];
        if(element.RollNo==rollNo){ 
          this.fb.controls['rollNo'].setValue(element.RollNo)
          this.fb.controls['fullName'].setValue(element.FullName)
          this.fb.controls['emailId'].setValue(element.EmailId)
          this.fb.controls['dob'].setValue(element.DOB)
          this.fb.controls['mobile'].setValue(element.MobileNo)
          this.fb.controls['gender'].setValue(element.Gender)
          this.fb.controls['fees'].setValue(element.Fees)
          break
        }
      }
    }
}
