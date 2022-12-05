import { Component, OnInit } from '@angular/core';
import { FabricsService } from './fabrics/fabrics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sewList';

  constructor (){}

  ngOnInit(): void {
  }
}
