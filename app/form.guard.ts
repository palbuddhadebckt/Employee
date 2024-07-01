import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
 export interface IsLeave{
  canLeave:()=>boolean |Observable<boolean>|Promise<boolean>
 }
@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanActivate, CanDeactivate<IsLeave> {

  constructor(private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      let data=localStorage.getItem('isLog');
      
      if(data){
        return true
      }else{
        this.router.navigate(['/'])
      }
      return false;
  }
  canDeactivate(
    component: IsLeave,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canLeave();
  }
  
}
