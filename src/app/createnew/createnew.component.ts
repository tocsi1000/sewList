import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FabricsService } from "../fabrics/fabrics.service";
import { Pattern } from "./setup/pattern.model";
import { OptionsService } from "./setup/options.service";

@Component({
    selector: 'app-createnew',
    templateUrl: './createnew.component.html',
    styleUrls: ['./createnew.component.css']
})

export class CreateNewProjectComponent implements OnInit, OnDestroy{

    @ViewChild('options') dataform:NgForm;
    allsetup:boolean = false;
    selectedPatternIndex:number;
    selectedPattern: Pattern;
    hovered=true;
    isLoading=false;
    optSub: Subscription;
    hovSub: Subscription;
    userSub:  Subscription;


    
    constructor(private fabServ:FabricsService, 
                private optS:OptionsService,
                private router:Router,
                private actRoute:ActivatedRoute,
                 ){}

    ngOnInit(){
             
        this.optSub=this.optS.allSetup.subscribe(resp =>{
            this.allsetup=resp;
            if (resp===false) {
                this.router.navigate(['setup'], {relativeTo:this.actRoute});
            } else {
                this.selectedPattern= this.optS.getSelectedPattern();
                this.selectedPatternIndex=this.optS.getSelectedPatternIndex();
            }
           
        })
        this.hovSub=this.fabServ.isHovered.subscribe(resp => { this.hovered=resp});        
    }
        

    onSavePlan(){
        this.isLoading=true;
       this.optS.shouldSave.next(true);
    }

    ngOnDestroy(): void {
        this.optS.allSetup.next(false);
        this.hovSub.unsubscribe();
        this.optSub.unsubscribe();
    }


}