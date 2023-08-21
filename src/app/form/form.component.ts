import { ComponentCanDeactivate } from '../models/component-can-deactivate';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { Address } from '../models/Address';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewChild,ElementRef } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,ComponentCanDeactivate,OnDestroy{
  title = 'FormComponent';
  formInvalid : boolean = false;
  id !: string ;
  isDirty : boolean= false;
  data !: Address;
  reactiveForm !: FormGroup
  buttonText : string = 'add';
  
  constructor(private ar : ActivatedRoute,private ds : DataService,private rs : Router) { }

  canDeactivate(){
    return !this.isDirty;
  }

  ngOnInit(){
    this.createReactiveForm();
    this.id  = this.ar.snapshot.params['id'];
    if(this.id){
      this.getData(this.id);
    }
  }

  createReactiveForm(){
    this.reactiveForm = new FormGroup({
      name : new FormControl( '' , Validators.required),
      email : new FormControl('' ,Validators.required),
      mobile : new FormControl( '' ,[Validators.required,Validators.pattern(/^\d{10}$/)]),
      landline : new FormControl('' ,Validators.required),
      website : new FormControl('' ,[Validators.required,Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")]),
      address : new FormControl('' ,Validators.required)
    });
  }

  getData(id : string){
    this.buttonText = 'update';
    this.ds.getSingleData(id).subscribe((value)=>{
      this.data = value;
      this.setFormValues();
    });
  }

  onSubmit(){
    this.isDirty = false;
    if(this.reactiveForm.valid){
      console.log(this.reactiveForm);
      this.formInvalid = false;
      if(this.data){
        this.data.name = this.name?.value;
        this.data.email = this.email?.value;
        this.data.phoneNumber = this.mobile?.value;
        this.data.landline = this.landline?.value;
        this.data.website = this.website?.value;
        this.data.address= this.address?.value;

        this.ds.updateData(this.data).pipe(
          switchMap(()=>this.ds.getData())
        ).subscribe((value)=>{
          this.ds.updateObservable(value);
          this.rs.navigate([`/home/${this.data.id}/view`]);
        });
        
      }
      else{
        // const x = new Address(
        //   this.name?.value,this.email?.value,this.mobile?.value,this.landline?.value,this.website?.value,this.address?.value
        // );
        
        this.ds.saveData(this.reactiveForm.value).pipe(
          switchMap((value) => {
            return this.ds.getData().pipe(
              tap((data) => {
                this.ds.updateObservable(data);
              }),
              map((data) => {
                return value.id;
              })
            );
          })
        ).subscribe((url) => {
          this.rs.navigate(['/home/'+url+'/view']);
        });

      }
    }
    else{
      this.formInvalid = true;
    }
  }

  setFormValues(){
    this.reactiveForm.patchValue({
      name : this.data?.name,
      email : this.data?.email,
      mobile : this.data?.phoneNumber,
      landline : this.data?.landline,
      website : this.data?.website,
      address : this.data?.address
    });
  }

  get name(){
    return this.reactiveForm.get('name');
  }
  get email(){
    return this.reactiveForm.get('email');
  }
  get mobile(){
    return this.reactiveForm.get('mobile');
  }
  get landline(){
    return this.reactiveForm.get('landline');
  }
  get website(){
    return this.reactiveForm.get('website');
  }
  get address(){
    return this.reactiveForm.get('address');
  }

  ngOnDestroy(): void {
    
  }
}
/*
// this.ds.saveData(x);
        // this.ds.saveData(x).subscribe((value)=>{
        //   this.ds.getData().subscribe((data)=>{
        //     this.ds.updateObservable(data);
        //     this.rs.navigate(['/home/details/'+value.id])
        //   });
        // })
        // this.ds.saveData(x).pipe(
        //   switchMap((p)=>this.ds.getData())
        // ).subscribe((value)=>{
        //   this.ds.updateObservable(value);
        //   this.rs.navigate(['/home/details/'+x.id]);
        // })* */