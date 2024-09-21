import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
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
export class AddressDetailsComponent implements OnInit {
  readonly title = 'AddressDetailsComponent'
  data !: Address;
  
  private activatedRoute = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private router = inject(Router)

  ngOnInit(): void {
    this.getId();
  }

  getId(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(p => this.dataService.getSingleData(p.get('id') as string))
    ).subscribe(value => {
      this.data = value;
    });
  }

  deleteRecord(): void {
    this.dataService.deleteData(this.data.id).pipe(
      switchMap(()=>this.dataService.getData())
    ).subscribe((value)=>{
      this.dataService.updateObservable(value);
      this.router.navigate(['/']);
    });
  }
}
