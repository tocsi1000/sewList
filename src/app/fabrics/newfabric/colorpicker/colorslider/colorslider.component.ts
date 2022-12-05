import { AfterViewInit, 
      Component, 
      ElementRef, 
      HostListener, 
      ViewChild } from '@angular/core';
import { colorService } from '../Color.service';

@Component({
  selector: 'app-colorslider',
  templateUrl: './colorslider.component.html',
  styleUrls: ['./colorslider.component.css']
})

export class ColorsliderComponent implements AfterViewInit {
  constructor(private colServ: colorService){}
  @ViewChild('slidercanvas') canvas: ElementRef<HTMLCanvasElement>;
  @HostListener('window:mouseup', ['$event']) onMouseUp(event:MouseEvent){
    this.mousedown = false;
  }
  
   
  mousedown:boolean = false;
  selectHeight: number;
  ctx: CanvasRenderingContext2D;
  
  
  ngAfterViewInit() {
    this.draw();
  }

  emitColor(x: number, y: number) {
    const rgbColor = this.getColorAtPosition(x, y);
    this.colServ.changeHue(rgbColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return 'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')';
    
  }

  draw(){
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d');
    }

    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);
    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgb(255, 0, 0)'); //1
    gradient.addColorStop(0.17, 'rgb(255, 255, 0)'); //2
    gradient.addColorStop(0.34, 'rgb(0, 255, 0)'); //3
    gradient.addColorStop(0.51, 'rgb(0, 255, 255)'); //4
    gradient.addColorStop(0.68, 'rgb(0, 0, 255)'); //5
    gradient.addColorStop(0.85, 'rgb(255, 0, 255)'); //6 
    gradient.addColorStop(1, 'rgb(255, 0, 0)'); //7

    this.ctx.beginPath();
    this.ctx.rect(0, 0, width, height);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectHeight) {
      this.ctx.beginPath()
      this.ctx.strokeStyle = 'white'
      this.ctx.lineWidth = 5
      this.ctx.rect(0, this.selectHeight - 5, width, 10)
      this.ctx.stroke()
      this.ctx.closePath()
    }
    }

  onMouseDown(event: MouseEvent){
    this.mousedown=true;
    this.selectHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetX, event.offsetY)
    
  }

  
  
  onMouseMove(event: MouseEvent){
    if (this.mousedown) {
      this.selectHeight = event.offsetY;
      this.draw();
      this.emitColor(event.offsetX, event.offsetY);
    }

  }

  onLoadHue(){
    //217,34,45
  }

  

}