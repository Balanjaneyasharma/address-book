import { Address } from '../models/Address';
import { Component, OnInit, OnDestroy, AfterContentChecked, AfterContentInit, DoCheck } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.css']
})
export class AddressTableComponent implements OnInit,OnDestroy{
  title = '';
  storage : Address[] =[];
  constructor(private ds : DataService){}

  ngOnInit(){
    this.getData();
  }

  getData(){
    this.ds.getData().subscribe((data)=>this.ds.updateObservable(data));
    this.ds.getObservable().subscribe((value)=>{
      this.storage = value;
    });
  }

  ngOnDestroy(): void {
    
  }
  onClick(){
  }

  /**
   * 
   * onClick(){
    this.title = 'io';
  }
  ngDoCheck(): void {
    console.log('change detected');
  }
  ngAfterContentInit(): void {
    console.log('change detected');
  }
   */

}
