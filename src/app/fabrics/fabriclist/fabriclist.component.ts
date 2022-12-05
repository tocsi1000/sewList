import { Component, OnInit } from "@angular/core";
import { Fabric } from "../fabric.model";
import { FabricsService } from "../fabrics.service";

@Component({
    selector: 'app-fabriclist',
    templateUrl: './fabriclist.component.html',
    styleUrls: ['./fabriclist.component.css'],
  })


export class FabricListComponent implements OnInit{
    constructor(private fabServ: FabricsService){}
    fabricList:Fabric[];
    filteredFabrics:Fabric[];
    isLoading:boolean=true;
    filteredType = [{name: 'warm', isF:true}, 
                    {name:'mid', isF:false}, 
                    {name:'light', isF:false}, 
                    {name:'rib', isF:false}];
    filteredCount=0;

    ngOnInit() {

        this.fabServ.FListUpdated.subscribe(msg => {
            this.fabricList = msg;
            this.isLoading=false;
            this.filterChange();

        })

    }

    clickRight(){
        this.filteredType[this.filteredCount].isF=false;
        if (this.filteredCount===3) {
            this.filteredCount=0;
        } else {
            this.filteredCount+=1;
        }
        this.filteredType[this.filteredCount].isF=true;     

        this.filterChange();
    }

    clickLeft(){
        this.filteredType[this.filteredCount].isF=false;
        if (this.filteredCount===0) {
            this.filteredCount=3;
        } else {
            this.filteredCount-=1;
        }
        this.filteredType[this.filteredCount].isF=true;

        this.filterChange();
    }

    filterChange() {
        this.filteredFabrics = this.fabricList.filter(x => 
          (x.type.toString() === 'warm' && this.filteredType[0].isF)
           || (x.type.toString() === 'mid' && this.filteredType[1].isF)
           || (x.type.toString() === 'light' && this.filteredType[2].isF)
           || (x.type.toString() === 'rib' && this.filteredType[3].isF) 
        );
      }

    getIndex(i:number){
        return this.fabricList.indexOf(this.filteredFabrics[i]);  
    }

    

    
}