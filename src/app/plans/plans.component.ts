import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { dataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit, OnDestroy {
  plansList=[];
  planSub:Subscription;
  isLoading=false;

  constructor(private dataserv:dataStorageService,
              private sanitizer:DomSanitizer) { }

 transform(img:string){
  return this.sanitizer.bypassSecurityTrustResourceUrl(img);
}

  ngOnInit(): void {
    this.isLoading=true;
    this.dataserv.loadAllPlans();
    this.planSub= this.dataserv.plansUpdated.subscribe(resp => {
      this.plansList = this.dataserv.getPlans();
      this.isLoading=false;
    })
  }

  ngOnDestroy(): void {
    this.planSub.unsubscribe();
  }

  onDelete(i:number){
    this.dataserv.deletePlan(i);
  }

  onMarkStatus(i){
    this.dataserv.markDone(i);
  }

}
