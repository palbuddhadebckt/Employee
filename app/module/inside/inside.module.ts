import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutusComponent } from 'src/app/components/aboutus/aboutus.component';
import { ContactusComponent } from 'src/app/components/contactus/contactus.component';
import { InsideComponent } from './inside.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { DetailsComponent } from 'src/app/components/details/details.component';

import { ShareModule } from 'src/app/share/share/share.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [AboutusComponent,ContactusComponent,InsideComponent,ListComponent,DetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ShareModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class InsideModule { }
