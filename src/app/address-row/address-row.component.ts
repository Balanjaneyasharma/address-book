import { Component, Input } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

import { Address } from '../models/Address';

@Component({
    selector: 'app-address-row',
    templateUrl: './address-row.component.html',
    styleUrls: ['./address-row.component.css'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class AddressRowComponent{
  @Input({required: true}) data !:  Address;
}

