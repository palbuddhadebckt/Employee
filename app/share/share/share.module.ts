import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'src/app/common/header/header.component';
import { FooterComponent } from 'src/app/common/footer/footer.component';
import { SidenavComponent } from 'src/app/common/sidenav/sidenav.component';
import { WildComponent } from 'src/app/components/wild/wild.component';


@NgModule({
  declarations: [HeaderComponent,FooterComponent,SidenavComponent,WildComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent,FooterComponent,SidenavComponent,WildComponent],
})
export class ShareModule { }
