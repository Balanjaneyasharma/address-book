import { ComponentCanDeactivate } from '../models/component-can-deactivate';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirtycheckGuard  {
  
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.canDeactivate()){
        return true;
      }
      else{
        let x = 'Unsaved Changes present in form ,Do you wish to continue';
        return confirm(x);
      }
  }
  
}
