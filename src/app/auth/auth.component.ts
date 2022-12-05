import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { FabricsService } from '../fabrics/fabrics.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error:string=null;
  isLoading:boolean=false;
  fabricsLoaded=false;

  constructor(private authServ:AuthService, 
              private authGuard:AuthGuard,
              private fabServ:FabricsService) { }

  ngOnInit(): void {
    this.fabServ.FListUpdated.subscribe(resp => {
      if (resp) {
        this.fabricsLoaded=true;
      }
    })
    
  }

  onSubmit(form:NgForm){
    this.isLoading=true;
    this.authServ.login(form.value.email, form.value.password)
    .subscribe(resp => {
      this.fabServ.loadFabrics();
      if (this.fabricsLoaded) {
        this.isLoading=false;
      }
    }, errorMess=> {
      this.error=errorMess;
      this.isLoading=false;
    })
    this.authGuard.redirected.next(false)
    form.reset;
  }

}
