import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { NgIf, TitleCasePipe } from '@angular/common';

import { map, switchMap, tap } from 'rxjs';

import { Address } from '../models/Address';
import { ComponentCanDeactivate } from '../models/component-can-deactivate';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, TitleCasePipe]
})
export class FormComponent implements OnInit, ComponentCanDeactivate{
  title = 'FormComponent';
  id!: string ;
  address!: Address;
  reactiveForm!: FormGroup
  buttonText : string = 'add';
  initialFormValue: any;
  isFormSubmitted!: boolean;

  private readonly linkPattern = `((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private router = inject(Router);

  ngOnInit(): void {
    this.createReactiveForm();
    this.id = this.activatedRoute.snapshot.params['id'];
    this.id && this.getData(this.id);
  }
  
  canDeactivate(): boolean {
    let isFormModified: boolean = Object.keys(this.initialFormValue)
    .some((field) => this.initialFormValue[field] !== this.reactiveForm.value[field]);    
    return !isFormModified;
  }

  createReactiveForm(): void {
    this.reactiveForm = new FormGroup({
      name : new FormControl( '' , Validators.required),
      email : new FormControl('' ,Validators.required),
      mobile : new FormControl( '' ,[Validators.required,Validators.pattern(/^\d{10}$/)]),
      landline : new FormControl('' ,Validators.required),
      website : new FormControl('' ,[Validators.required,Validators.pattern(this.linkPattern)]),
      address : new FormControl('' ,Validators.required)
    });
  }

  getData(id : string): void {
    this.buttonText = 'update';
    this.dataService.getSingleData(id).subscribe((value)=>{
      this.address = value;
      this.setFormValues();
      this.initialFormValue = structuredClone(this.reactiveForm.value);
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;

    if(this.reactiveForm.invalid) return;

    const formValue = this.reactiveForm.value;
    if(this.address){
      this.address.name = formValue.name;
      this.address.email = formValue.email;
      this.address.phoneNumber = formValue.mobile;
      this.address.landline = formValue.landline;
      this.address.website = formValue.website;
      this.address.address= formValue.address;

      this.dataService.updateData(this.address).pipe(
        switchMap(()=>this.dataService.getData())
      ).subscribe((value)=>{
        this.dataService.updateObservable(value);
        this.router.navigate([`/home/${this.address.id}/view`]);
      });
      
    } else {        
      this.dataService.saveData(this.reactiveForm.value).pipe(
        switchMap((value) => {
          return this.dataService.getData().pipe(
            tap((data) => {
              this.dataService.updateObservable(data);
            }),
            map(() => {
              return value.id;
            })
          );
        })
      ).subscribe((url) => {
        this.router.navigate(['/home/'+url+'/view']);
      });
    }
  }

  setFormValues(): void {
    this.reactiveForm.patchValue({
      name : this.address?.name,
      email : this.address?.email,
      mobile : this.address?.phoneNumber,
      landline : this.address?.landline,
      website : this.address?.website,
      address : this.address?.address
    });
  }

}