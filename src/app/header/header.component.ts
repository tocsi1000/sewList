import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { OptionsService } from '../createnew/setup/options.service';
import { FabricsService } from '../fabrics/fabrics.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
  flistOK=false;
  isLoggedin=false;


 
  constructor(private optS:OptionsService, 
              private router:Router, 
              private authServ:AuthService,
              private fabserv:FabricsService) { }

  ngOnInit(): void {
    this.authServ.user.subscribe(resp =>  {
      if (resp) {
        this.isLoggedin=true;
      } else {
        this.isLoggedin=false;
      }
    }
    )
    this.fabserv.FListUpdated.subscribe(resp => {
      if (resp) {
        this.flistOK=true;
      } 
    })

  }

  onCreateNew(){
    this.optS.allSetup.next(false);
    this.router.navigate(["/newproject/setup"]);   

  }

  logout(){
    this.authServ.logout();
    //this.isLoggedin=false;
    this.router.navigate(["/signin"])
  }
  

  

}
