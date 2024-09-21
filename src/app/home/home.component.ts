import { DataService } from '../services/data.service';
import { Component } from '@angular/core';
import { AddressTableComponent } from '../address-table/address-table.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [DataService],
    standalone: true,
    imports: [AddressTableComponent, RouterOutlet]
})
export class HomeComponent {
  
}
