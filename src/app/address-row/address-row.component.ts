import { Address } from '../models/Address';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-row',
  templateUrl: './address-row.component.html',
  styleUrls: ['./address-row.component.css']
})
export class AddressRowComponent{
  @Input('data') data !:  Address;
  constructor(){ }
}

