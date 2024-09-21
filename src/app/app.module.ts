import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressTableComponent } from './address-table/address-table.component';
import { AddressRowComponent } from './address-row/address-row.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { provideHttpClient, withInterceptorsFromDi } from  '@angular/common/http';

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FormComponent,
        AddressTableComponent,
        AddressRowComponent,
        AddressDetailsComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { 
  
}
