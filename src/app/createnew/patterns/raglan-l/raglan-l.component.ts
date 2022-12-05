import { Component, ElementRef, OnInit, Renderer2, ViewChild, OnDestroy } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { Subscription, tap } from 'rxjs';
import { dataStorageService } from 'src/app/data-storage.service';
import { Fabric } from 'src/app/fabrics/fabric.model';
import { FabricsService } from 'src/app/fabrics/fabrics.service';
import { OptionsService } from '../../setup/options.service';

@Component({
  selector: 'app-raglan-l',
  templateUrl: './raglanLS.html',
  styleUrls: ['./raglan-l.component.css']
})
export class RaglanLComponent implements OnInit, OnDestroy {
  printedFabrics: Fabric[] =[];
  colorSubscr:Subscription;
  selectedColor: string ='rgb(192, 192, 192)';
  wantedParts: number;

  @ViewChild('1') a1:ElementRef;
  @ViewChild('2') a2:ElementRef;
  @ViewChild('3') a3:ElementRef;
  @ViewChild('4') a4:ElementRef;
  @ViewChild('5') a5:ElementRef;
  @ViewChild('6') a6:ElementRef;
  @ViewChild('7') a7:ElementRef;
  @ViewChild('8') a8:ElementRef;


  @ViewChild('screen', {static:true}) screen:ElementRef;

  
  fillColor = 'rgb(0, 0, 0)';
  fillColor1 = 'rgb(255, 255, 255)';
  fillColor2 = 'rgb(255, 255, 255)';
  fillColor3 = 'rgb(255, 255, 255)';
  fillColor4 = 'rgb(255, 255, 255)'; 
  fillColor5 = 'rgb(255, 255, 255)';
  fillColor6 = 'rgb(255, 255, 255)';
  fillColor7 = 'rgb(255, 255, 255)';
  fillColor8 = 'rgb(255, 255, 255)';



  constructor(private fabricSer:FabricsService, 
    private renderer:Renderer2, 
    private setup:OptionsService,
    private datastorage:dataStorageService,
    private ngserv:NgxCaptureService,
    ) {} 

    ngOnInit(){
      this.setup.shouldSave.subscribe(resp => {
        if (resp==true) {
          this.onSave();
        }
      })
    this.printedFabrics=this.fabricSer.getPrintedFabrics();
    this.colorSubscr = this.fabricSer.getSelectedFabricColor().subscribe(
      fabColor =>{
          if(fabColor.PorP === 'plain') {
            this.selectedColor=fabColor.color;
          } else {
            this.selectedColor='url(#'+fabColor.name+')';
          }
      }) 

    this.wantedParts=this.setup.getwantedBodyParts();
    }

    ngOnDestroy(): void {
      this.colorSubscr.unsubscribe();
    }

  changeColor(selectedArea:string) {
    switch (selectedArea) {
      case "fillColor1": {
        this.fillColor1 = this.selectedColor; 
        this.renderer.setAttribute(this.a1.nativeElement, 'fill', this.fillColor1);
        break;}
      case "fillColor2": {
        this.fillColor2 = this.selectedColor;
        this.renderer.setAttribute(this.a2.nativeElement, 'fill', this.fillColor2);
        
        break;}
      case "fillColor3": {
        this.fillColor3 = this.selectedColor;
        this.renderer.setAttribute(this.a3.nativeElement, 'fill', this.fillColor3);
        break;}
      case "fillColor4": {
        this.fillColor4 = this.selectedColor;
        this.renderer.setAttribute(this.a4.nativeElement, 'fill', this.fillColor4)
        break;}
      case "fillColor5": {
          this.fillColor5 = this.selectedColor;
          this.renderer.setAttribute(this.a5.nativeElement, 'fill', this.fillColor5)
          break;}
      case "fillColor6": {
        this.fillColor6 = this.selectedColor;
        this.renderer.setAttribute(this.a6.nativeElement, 'fill', this.fillColor6)
        break;}
      case "fillColor7": {
         this.fillColor7 = this.selectedColor;
         this.renderer.setAttribute(this.a7.nativeElement, 'fill', this.fillColor7)
         break;}
      case "fillColor8": {
        this.fillColor8 = this.selectedColor;
        this.renderer.setAttribute(this.a8.nativeElement, 'fill', this.fillColor8)
         break;}     
      
    }
  }

  onSave(){
    const dimensions = this.screen.nativeElement.getBoundingClientRect();
    this.ngserv.getImage(this.screen.nativeElement, false, {width: dimensions.width,
      height: dimensions.height,
      useCORS: true
      })
      .pipe(
        tap(img => 
          {this.datastorage.savePlan(img)}
      )).subscribe()
  }
}
