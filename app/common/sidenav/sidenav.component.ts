import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  clearStorage(){
    let val=window.confirm("Are tou want to log Out...");
    console.log(val);
    
    if(val){
      localStorage.removeItem('isLog');
    }
  }

}
