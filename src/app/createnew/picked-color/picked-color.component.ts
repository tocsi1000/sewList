import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fabric } from 'src/app/fabrics/fabric.model';
import { FabricsService } from 'src/app/fabrics/fabrics.service';
import { OptionsService } from '../setup/options.service';

@Component({
  selector: 'app-picked-color',
  templateUrl: './picked-color.component.html',
  styleUrls: ['./picked-color.component.css']
})
export class PickedColorComponent implements OnInit {
  hovered:Fabric;
  isPlain:boolean;

  constructor(private fabServ:FabricsService) { }

  ngOnInit(): void {
    this.hovered=this.fabServ.getHoveredFabric()
   
  }

  

}
