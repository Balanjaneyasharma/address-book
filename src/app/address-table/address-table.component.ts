import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';

import { Address } from '../models/Address';
import { DataService } from '../services/data.service';
import { AddressRowComponent } from '../address-row/address-row.component';

@Component({
    selector: 'app-address-table',
    templateUrl: './address-table.component.html',
    styleUrls: ['./address-table.component.css'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass, AddressRowComponent, RouterLink]
})
export class AddressTableComponent implements OnInit {
  title = '';
  addresses : Address[] =[];

  private dataService = inject(DataService);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService.getData().subscribe((data)=>this.dataService.updateObservable(data));
    this.dataService.getObservable().subscribe((value)=>{
      this.addresses = value ?? [];
    });
  }

}
