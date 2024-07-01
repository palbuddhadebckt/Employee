import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/test.service';
import { EmpType } from 'src/app/employee.interface';
import { qualy } from 'src/app/employee.interface';
import { File_validation } from '../fileValidation';
import { Observable, Subscription } from 'rxjs';
import { IsLeave } from 'src/app/form.guard';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  constructor(private fb: FormBuilder, private router: Router,
    private store: TestService, private acRout: ActivatedRoute) { }

  gender: string[] = ["Male", "Female", "Other"];
  languages: string[] = ["Bengali", "English", "Hindi", "Marathi", "Tamil", "Gujrati", "Telegue"];
  skills: string[] = ["Html", "Css", "Java", "Java script", "PHP", "Angular", "React", "Node", "Other"];
  duplicateArr: any[] = [];
  isSubmit = false;
  editData!: EmpType;
  formType = "new";
  id!: string;
  dataSubscription!: Subscription[];

  ngOnInit(): void {
    //Accept edit id...
    this.id = this.acRout.snapshot.params['id']
    console.log((this.id));
    if (this.id) {
      this.getDataById(this.id);
    }
  }

  //From group
  empData = this.fb.group({
    name: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    language: this.fb.array(
      //  this.languages.map((x)=>this.duplicateArr.indexOf(x)>-1),
      this.languages.map((language) => this.fb.control(false)), [File_validation.languageValidation]),
    qualyfication: new FormArray([
      new FormGroup({
        degree: new FormControl('', [Validators.required]),
        univercity: new FormControl('', [Validators.required])
      })
    ]),
    skills: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fileUpload: new FormControl(null, [Validators.required, File_validation.validate])
  })

  get qualyControl() {
    return this.empData.get("qualyfication") as FormArray;
  }

  //Function for adding Qualification
  addQualification() {
    let degree = this.empData.get('qualyfication') as FormArray;
    degree.push(new FormGroup({
      degree: new FormControl('', [Validators.required]),
      univercity: new FormControl('', [Validators.required])
    }))
  }

  //Function for removing Qualification
  removeDegree(id: number) {
   let isRemove=true;
    let degree =(this.qualyControl as FormArray).controls;
    //console.log(degree);
    for(let key in degree[id].value){
     //console.log(key)
     const value=degree[id].value[key];
     console.log(value);
     if(value){
      isRemove=false;
      break
     }
    }
    if(isRemove){
      this.qualyControl.removeAt(id)
    }else{
      if(window.confirm("Are you Want to remove this element...")){
        this.qualyControl.removeAt(id)
      }
    }
    
  }

  //its return array of language name from array of index
  getBooleanData(): string[] {
    let arr: string[] = [];
    this.empData.value.language?.filter((data, i) => {
      if (data) {
        arr.push(this.languages[i])
      }
    })
    return arr;
  }


  //its reset the form
  formReset() {
    this.empData.reset()
  }

  //its set the file to control
  onFileSelected(event: Event) {
    const fileInput = event?.target as HTMLInputElement;
    //console.log(fileInput);
    const files = fileInput?.files;
    if (fileInput && files && files.length > 0) {
      (this.empData.get('fileUpload') as FormControl).setValue((files[0]));
    }
    return files?.[0]
  }


  //its set edit data to the form 
  getDataById(id: string) {
    (this.store.editData(id).subscribe({
      next: (data:EmpType) => {
        console.log(data);
        this.empData.patchValue({
          name: data.name, mail: data.mail, gender: data.gender,
          skills: data.skills, password: data.password
        });

        this.empData.controls['language'].patchValue(
          this.languages.map(val => data.language.includes(val))
        );
        console.log(data.qualyfication)
        if(Object.keys(data.qualyfication).length){
         
          for(let i=0;i<data.qualyfication.length;i++){
            if(i>0){
              this.addQualification()
            }
            let arrData=data.qualyfication[i];
            let control=this.qualyControl.at(i);
            control.patchValue({
              degree:arrData.degree,
              univercity:arrData.univercity
            })
          }
        }
      }
    }));
    this.formType = "edit";
  }

  //its call when we submit the form
  onsubmit() {
    this.isSubmit = true;
    console.log(this.empData);

    if (this.empData.valid && this.isSubmit) {
      let formData = Object.assign(this.empData.value, { language: this.getBooleanData() }) as EmpType;
      console.log(formData);
      if (this.formType == "new") {         //This block for new registration
        (this.store.insertdata(formData).subscribe({
          next: (data) => { this.router.navigate(['/']); }
        }))
      } else {                 //This block for edit
        (this.store.updateData(this.id, formData).subscribe({
          next: (val) => { this.router.navigate(['/inside/list']) }
        }))
      }
    }
  }

  // canLeave(){
    
  //   const status=
  //   return true
  // }

  

  ngOnDestroy(): void {
    //this.dataSubscription.forEach((element)=>{element.unsubscribe()})
  }
}
