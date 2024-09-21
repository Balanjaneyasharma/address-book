import { ComponentCanDeactivate } from '../models/component-can-deactivate';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirtycheckGuard  {
  
  canDeactivate(
    component: ComponentCanDeactivate): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.canDeactivate()){
        return true;
      }
      else{
        let x = 'Unsaved Changes present in form ,Do you wish to continue';
        return confirm(x);
      }
  }
  
}
