import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './module/default/default.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InsideComponent } from './module/inside/inside.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginGuard } from './login.guard';
import { FormGuard } from './form.guard';
import { WildComponent } from './components/wild/wild.component';

const routes: Routes = [
  {path:'',component:DefaultComponent,
    children:[{path:'',component:LoginComponent,canActivate:[LoginGuard],canDeactivate:[FormGuard]},
    {path:'registration',component:RegistrationComponent},
    {path:'edit/:id',component:RegistrationComponent},
    //{path:'**',component:WildComponent}
  ]
  },
  {path:'inside',component:InsideComponent,canActivate:[FormGuard],
    children:[
    {path:'',component:AboutusComponent},
    {path:'contactus',component:ContactusComponent},
    {path:'list',component:ListComponent},
    {path:'details',component:DetailsComponent},
    //{path:'**',component:WildComponent}
  ]
  },
  {path:'**',component:WildComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
