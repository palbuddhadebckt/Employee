
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class File_validation {

  static validate(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    console.log(file);
    
    if (file) {
      const fileSizeInMB = file.size / (2*1024*1024);
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      console.log(file.type);
      const fileExtension = file.type;
      console.log(fileExtension);
      
      if (fileSizeInMB > 1) {
        return { maxFileSize: true };
      }

      if (!allowedTypes.includes(fileExtension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  static languageValidation(control:AbstractControl):ValidationErrors|null {
   if(!control.value.some((data:boolean)=>data==true)){
    return {languageError:true}
   }
    return null
  }

}