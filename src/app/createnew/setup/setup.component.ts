import { Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { dataStorageService } from 'src/app/data-storage.service';
import { Pattern } from 'src/app/createnew/setup/pattern.model';
import { OptionsService } from './options.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit  {
  selectedPatternIndex:number;
  selectedPattern:string;
  isSelected:boolean;
  allPatterns:Pattern[];
  isHovered = -1;
  isBPopt:boolean;
  isPocketOpt:boolean;
  parts=[];
  @ViewChild('options') dataform:NgForm;

  constructor(private optS:OptionsService, 
              private router:Router,
              private datastorage:dataStorageService) { }

  ngOnInit(): void {
    this.optS.allSetup.next(false);
    this.isSelected=false;
    this.selectedPattern=null;
    this.allPatterns = this.datastorage.loadAllPatterns();

  }

  onChoosePattern(i: number){
    this.optS.selectPattern(i);
    this.selectedPatternIndex=i;
    this.isSelected=true;
    this.selectedPattern=this.allPatterns[i].name;
    if (this.allPatterns[i].colorBlockOpt===1) {
        this.isBPopt=false;
    } else {
        this.isBPopt=true;
        let k=1;
        this.parts.splice(0);
         while (k <= this.allPatterns[i].colorBlockOpt) 
            {this.parts.push(k);
            k++};
    } 
    if (this.allPatterns[i].pocketOpt) {
        this.isPocketOpt=true;
    } else {
        this.isPocketOpt=false;
    }

    
}

onSubmit(){
    if (this.dataform.value.pocket ==='true') {
        this.optS.setisPocket(true);
    } else {
      this.optS.setisPocket(false);
    }
    this.optS.setwantedBodyParts(this.dataform.value.bodyparts);
    this.dataform.reset;
       this.optS.allSetup.next(true);
    this.router.navigate(['newproject']);
}

}
