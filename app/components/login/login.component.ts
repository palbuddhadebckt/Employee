import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from 'src/app/test.service';
import { EmpType } from 'src/app/employee.interface';
import { IsLeave } from 'src/app/form.guard';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,IsLeave,OnDestroy{

  constructor(private fb:FormBuilder,private store:TestService,private router:Router){};

  logInData:EmpType[]=[];
  message:string='';
  isSubmit=false;
  dataSubsciption!:Subscription

  ngOnInit(): void {
   this.dataSubsciption=this.store.getData().subscribe({
      next:(data)=>{
        this.logInData=data;
        console.log(data);
      }
    })
  }

  logData=this.fb.group({
    logMail:new FormControl('',[Validators.required]),
    logPass:new FormControl('',[Validators.required])
  })

  onsubmit(){
    console.log(this.logData);
    this.isSubmit=true;
    if(this.logData.valid){
    let data=this.logData.value;
    //this.logData.reset();
    let result=this.logInData.some(val=>val.mail==data.logMail && val.password==data.logPass);
    if(result){
      console.log("Log in sucessfull");
      localStorage.setItem("isLog",JSON.stringify({isLogin: true}));
      this.isSubmit=false;
      this.router.navigate(['/inside'])
    }else{
      this.message="Pleace enter correct data...";
      console.log("Log in is not sucessfull");
    }
  }
  }

  canLeave(){
    let data=this.logData.value;
    if((data.logMail || data.logPass)&&(this.logData.invalid)){
     return window.confirm('Are you sure to leave this page...')
    }
    return true
  }

  ngOnDestroy(): void {
    this.dataSubsciption.unsubscribe();
  }
 
}
