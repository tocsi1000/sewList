import { Component, ElementRef, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { Subscription, tap } from 'rxjs';
import { dataStorageService } from 'src/app/data-storage.service';
import { Fabric } from 'src/app/fabrics/fabric.model';
import { FabricsService } from 'src/app/fabrics/fabrics.service';
import { OptionsService } from '../../setup/options.service';

@Component({
  selector: 'app-raglandress',
  templateUrl: './raglandress.component.html',
  styleUrls: ['./raglandress.component.css']
})
export class RaglandressComponent implements OnInit, OnDestroy {
  wantPockets:boolean;
  wantedBodyparts:number;
  allFabrics:Fabric[];
  printedFabrics:Fabric[];
  colorSubscr:Subscription;
  selectedColor: string ='rgb(192, 192, 192)';

  fillColor = 'rgb(255, 255, 255)'; //upper  bodypart
  fillColor1 = 'rgb(255, 255, 255)'; 
  fillColor2 = 'rgb(255, 255, 255)'; //right arm
  fillColor3 = 'rgb(255, 255, 255)'; //left arm
  fillColor4 = 'rgb(255, 255, 255)';  //middle part
  fillColor5 = 'rgb(255, 255, 255)'; //bottom part
  fillColor6 = 'rgb(200, 200, 200)'; //neckline

  @ViewChild('1') a1:ElementRef;
  @ViewChild('2') a2:ElementRef;
  @ViewChild('3') a3:ElementRef;
  @ViewChild('4') a4:ElementRef;
  @ViewChild('5') a5:ElementRef;
  @ViewChild('6') a6:ElementRef;
  @ViewChild('screen', {static:true}) screen:ElementRef;

  constructor(private fabricserv:FabricsService,
              private render:Renderer2,
              private setup:OptionsService,
              private datastorage:dataStorageService,
              private ngxservice:NgxCaptureService,
             ) { }

  ngOnInit(): void {
    this.setup.shouldSave.subscribe(resp => {
      if (resp==true) {
        this.onSave();
      }
    })
    this.printedFabrics= this.fabricserv.getPrintedFabrics();
    this.colorSubscr = this.fabricserv.getSelectedFabricColor().subscribe(
      fabColor =>{
          if(fabColor.PorP === 'plain') {
            this.selectedColor=fabColor.color;
          } else {
            this.selectedColor='url(#'+fabColor.name+')';
          }
      })
    this.wantPockets= this.setup.getisPocket();
    this.wantedBodyparts=this.setup.getwantedBodyParts();
  }

  ngOnDestroy(){
    this.colorSubscr.unsubscribe();
  }

  changeColor(selectedArea:string){
    switch (selectedArea) {
      case "fillColor1": {
        this.fillColor1 = this.selectedColor; 
        this.render.setAttribute(this.a1.nativeElement, 'fill', this.fillColor1);
        break;}
      case "fillColor2": {
        this.fillColor2 = this.selectedColor;
        this.render.setAttribute(this.a2.nativeElement, 'stroke', this.fillColor2);
        this.render.setAttribute(this.a6.nativeElement, 'fill', this.fillColor2);        
        break;}
      case "fillColor3": {
        this.fillColor3 = this.selectedColor;
        this.render.setAttribute(this.a3.nativeElement, 'fill', this.fillColor3);
        break;}
      case "fillColor4": {
        this.fillColor4 = this.selectedColor;
        this.render.setAttribute(this.a4.nativeElement, 'fill', this.fillColor4)
        break;}
      case "fillColor5": {
          this.fillColor5 = this.selectedColor;
          this.render.setAttribute(this.a5.nativeElement, 'fill', this.fillColor5)
          break;}
      case "fillColor6": {
        this.fillColor6 = this.selectedColor;
        this.render.setAttribute(this.a6.nativeElement, 'stroke', this.fillColor6)
          break;}
    }

  }

  onSave(){
    const dimensions = this.screen.nativeElement.getBoundingClientRect();
    this.ngxservice.getImage(this.screen.nativeElement, false, {width: dimensions.width,
      height: dimensions.height,
      useCORS: true
      })
      .pipe(
        tap(img => 
          {this.datastorage.savePlan(img)}
      )).subscribe()
  }

}
