import { DataService } from '../services/data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [DataService]
})
export class HomeComponent {
  constructor(){
  }
}
