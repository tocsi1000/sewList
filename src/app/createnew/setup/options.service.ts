import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { dataStorageService } from "../../data-storage.service";
import { Pattern } from "./pattern.model";

@Injectable()
export class OptionsService {
    wantedPockets:boolean;
    wantedBodyPart:number;
    allPatterns:Pattern[];
    selectedPattern:Pattern;
    selectedIndex:number;
    allSetup = new BehaviorSubject<boolean>(false);
    shouldSave= new Subject;

    constructor(private dataStorage:dataStorageService){}

    setwantedBodyParts(i:number){
        this.wantedBodyPart=i;
    }

    getwantedBodyParts(){
        return this.wantedBodyPart;
    }

    setisPocket(wanted:boolean){
        this.wantedPockets=wanted;
    }

    getisPocket(){
        return this.wantedPockets;
    }

    selectPattern(i:number){
        this.allPatterns=this.dataStorage.loadAllPatterns();
        this.selectedPattern=this.allPatterns[i];
        this.selectedIndex=i;
    }

    getSelectedPattern(){
        return this.selectedPattern;
    }

    getSelectedPatternIndex(){
        return this.selectedIndex;
    }


    

    


}