import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Fabric } from "../../fabric.model";
import { FabricsService } from "../../fabrics.service";

@Component({
    selector:'app-fabricitem',
    templateUrl:'./fabricitem.component.html',
    styleUrls:['./fabricitem.component.css']
})
export class fabricItemComponent implements OnInit{
    @Input() fabricitem: Fabric;
    @Input() index: number;
    isPlain = false;
    hovered = false;
    color:string;
    buttonColor:string = 'rgb(105, 102, 102)';

constructor(private  fabserv:FabricsService, 
            private router:Router,
            ){}


ngOnInit(){
    if (this.fabricitem.PorP==='plain'){
        this.isPlain=true;
        this.color=this.fabricitem.color.slice(4, -1);
        const r =+(this.color.split(",")[0]).slice(0,-1);
        const g =+this.color.split(",")[1];
        const b =+(this.color.split(",")[2]).slice(1);
        if (r <=99 && b<=99 && g <=99 ) {
            this.buttonColor='rgb(255,255,255)'
        } else {
            this.buttonColor='rgb(0,0,0)'
        }
 } else {
        this.isPlain=false;
    } 
    
}

showDetails(){
    this.hovered=true;
    //showaline
}

hideDetails(){
    this.hovered=false;
    //deleteline 
}

onDelete(){
    this.fabserv.deleteFabric(this.index);
}

onEdit(){
        this.router.navigate(['fabrics/edit'], {queryParams:{'id': this.index}})
}
    
}