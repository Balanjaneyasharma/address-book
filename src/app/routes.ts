import { Routes } from '@angular/router';

import { DirtycheckGuard } from './route-guards/dirtycheck.guard';
import { FormComponent } from './form/form.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { HomeComponent } from './home/home.component'

export const routes: Routes = [
  { path :'', redirectTo : 'home', pathMatch : 'full'},
  { path : 'home', component : HomeComponent,
    children : [
      { path : ':id/view', component : AddressDetailsComponent, },
      { path : 'add', component : FormComponent },
      { path : ':id/edit', component : FormComponent, canDeactivate:[DirtycheckGuard] } 
    ]
  },
   {path : 'add',redirectTo : 'home/add'},
  { path : '**', redirectTo : 'home' }

];