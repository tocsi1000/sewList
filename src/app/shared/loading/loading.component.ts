import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
