import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { switchMap } from 'rxjs';

import { DataService } from '../services/data.service';
import { Address } from '../models/Address';

@Component({
    selector: 'app-address-details',
    templateUrl: './address-details.component.html',
    styleUrls: ['./address-details.component.css'],
    standalone: true,
    imports: [NgIf, RouterLink]
})
export class AddressDetailsComponent implements OnInit,OnDestroy{
  readonly title = 'AddressDetailsComponent'
  data !: Address;
  
  constructor(private ar : ActivatedRoute,private ds : DataService,private rs : Router){}

  ngOnInit(){
    this.getId();
  }

  getId() {
    this.ar.paramMap.pipe(
      switchMap(p => this.ds.getSingleData(p.get('id') as string))
    ).subscribe(value => {
      this.data = value;
    });
  }


  deleteRecord(){
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
