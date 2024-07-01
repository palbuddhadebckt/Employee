import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { StaticComponent } from 'src/app/components/static/static.component';
import { ShareModule } from 'src/app/share/share/share.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DefaultComponent,LoginComponent,RegistrationComponent,StaticComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
