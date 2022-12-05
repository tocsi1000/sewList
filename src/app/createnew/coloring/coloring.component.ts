import { Component, OnInit, Renderer2 } from '@angular/core';
import { Fabric } from 'src/app/fabrics/fabric.model';
import { FabricsService } from 'src/app/fabrics/fabrics.service';

@Component({
  selector: 'app-coloring',
  templateUrl: './coloring.component.html',
  styleUrls: ['./coloring.component.css']
})
export class ColoringComponent implements OnInit {
  fabrics: Fabric[];
  filteredFabrics: Fabric[];
  hoveredIndex:number;
  selectedFabric: Fabric;
  selectedID:number;
  filteredID:number;
  filteredType = {warm:false, mid:false, light:true, rib:false};
  filteredPorP = {plain: true, printed:true};


  constructor(private fabricServ: FabricsService){}
  
  ngOnInit(): void {
    this.fabrics = this.fabricServ.getFabrics();
    this.filterChange();
  }

  onPickColor(i:number){
    this.filteredID=i;
    this.selectedID = this.fabrics.indexOf(this.filteredFabrics[i]);
    this.selectedFabric = this.fabrics[this.selectedID];
    this.fabricServ.setSelectedFabricColor(this.selectedFabric);
}

  onHover(i:number){
    this.hoveredIndex=this.fabrics.indexOf(this.filteredFabrics[i])
    this.fabricServ.setHoveredFabric(this.hoveredIndex);
  }

  offHover(){
    this.fabricServ.isHovered.next(false);
  }


  filterChange() {
    this.filteredFabrics = this.fabrics.filter(x => 
      ( (x.type.toString() === 'warm' && this.filteredType.warm)
       || (x.type.toString() === 'mid' && this.filteredType.mid)
       || (x.type.toString() === 'light' && this.filteredType.light)
       || (x.type.toString() === 'rib' && this.filteredType.rib) ) &&
       ((x.PorP === 'plain' && this.filteredPorP.plain)
       || (x.PorP === 'printed' && this.filteredPorP.printed))
    );
  }

}
