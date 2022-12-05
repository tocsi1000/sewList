import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { colorService } from '../Color.service';

@Component({
  selector: 'app-colorpalette',
  templateUrl: './colorpalette.component.html',
  styleUrls: ['./colorpalette.component.css']
})
export class ColorpaletteComponent implements AfterViewInit, OnInit, OnDestroy {

  hue: Subscription;
  hueSTR: string;
  color: string;  
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  constructor(private colSer: colorService){}

  private ctx: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  public selectedPosition: { x: number; y: number };


  ngOnInit(){
    this.hue=this.colSer.hueChanges.subscribe(
      changedValue  => {
        this.hueSTR=changedValue;
        this.draw()
      const pos = this.selectedPosition
      if (pos) {
        this.colSer.changeColor(this.getColorAtPosition(pos.x, pos.y))
      }
      }
    )
  }

  ngAfterViewInit() {
    this.draw()
  }

  ngOnDestroy(): void {
    this.hue.unsubscribe();
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d')
    }
    const width = this.canvas.nativeElement.width
    const height = this.canvas.nativeElement.height

    this.ctx.fillStyle = this.hueSTR;
    this.ctx.fillRect(0, 0, width, height)

    const whiteGrad = this.ctx.createLinearGradient(0, 0, width, 0)
    whiteGrad.addColorStop(0, 'rgba(255,255,255,0)')
    whiteGrad.addColorStop(1, 'rgba(255,255,255,1)')

    this.ctx.fillStyle = whiteGrad
    this.ctx.fillRect(0, 0, width, height)

    const blackGrad = this.ctx.createLinearGradient(0, 0, 0, height)
    blackGrad.addColorStop(0, 'rgba(0,0,0,0)')
    blackGrad.addColorStop(1, 'rgba(0,0,0,1)')

    this.ctx.fillStyle = blackGrad
    this.ctx.fillRect(0, 0, width, height)

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white'
      this.ctx.fillStyle = 'white'
      this.ctx.beginPath()
      this.ctx.arc(
        this.selectedPosition.x,
        this.selectedPosition.y,
        10,
        0,
        2 * Math.PI
      )
      this.ctx.lineWidth = 5
      this.ctx.stroke()
    }
  }
 
  @HostListener('window:mouseup', ['$event'])
  onMouseUp(evt: MouseEvent) {
    this.mousedown = false
  }

  onMouseDown(evt: MouseEvent) {
    this.mousedown = true
    this.selectedPosition = { x: evt.offsetX, y: evt.offsetY }
    this.draw()
    this.color=this.colSer.changeColor(this.getColorAtPosition(evt.offsetX, evt.offsetY))
  }

  onMouseMove(evt: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: evt.offsetX, y: evt.offsetY }
      this.draw()
      this.emitColor(evt.offsetX, evt.offsetY)
    }
  }

  emitColor(x: number, y: number) {
    const rgbColor = this.getColorAtPosition(x, y)
    this.color=this.colSer.changeColor(rgbColor)
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data
    return (
      'rgb(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ')'
    )
  }
}


