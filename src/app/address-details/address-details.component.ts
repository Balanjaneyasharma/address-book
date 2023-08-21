import { DataService } from '../services/data.service';
import { ActivatedRoute, Routes, Router, ParamMap } from '@angular/router';
import { Address } from '../models/Address';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { map, shareReplay, switchMap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css']
})
export class AddressDetailsComponent implements OnInit,OnDestroy{
  title = 'AddressDetailsComponent'
  data !: Address;
  
  constructor(private ar : ActivatedRoute,private ds : DataService,private rs : Router){}

  ngOnInit(){
    this.getId();
  }

  /* getId(){
  //   this.ar.paramMap.subscribe((p)=>{
  //       this.getData(p.get('id') as string);
  //   });
  }   
  */ 
  getId() {
    this.ar.paramMap.pipe(
      switchMap(p => this.ds.getSingleData(p.get('id') as string))
    ).subscribe(value => {
      console.log(value);
      this.data = value;
    });
  }

  /* getData(id : string){
  //   this.ds.getSingleData(id!).subscribe((value)=>{
  //     console.log(value);
  //     this.data = value;
  //   });
  }
  */ 

  deleteRecord(){
    // this.ds.deleteData(this.data.id);
    this.ds.deleteData(this.data.id).pipe(
      switchMap(()=>this.ds.getData())
    ).subscribe((value)=>{
      this.ds.updateObservable(value);
      this.rs.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    
  }
}
/* this.
ar.paramMap.pipe(
      //   map((params)=>{
      //     let id = params.get('id');
      //     this.ds.getSingleData(id as string).pipe(
      //       map((data)=>{
      //         console.log(data);
      //         this.data = data;
      //       })
      //     )
          
      //   })
      // )
    // this.ds.getSingleData(this.id$)
    .pipe(
      shareReplay(1),
      map((data)=>data)
    )*/