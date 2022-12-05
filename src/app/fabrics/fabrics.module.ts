import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { sharedModule } from "../shared/shared.module";
import { fabricItemComponent } from "./fabriclist/fabricitem/fabricitem.component";
import { FabricListComponent } from "./fabriclist/fabriclist.component";
import { fabricsComponent } from "./fabrics.component";
import { FabricRoutingModule } from "./fabrics.router-module";
import { colorpickerModule } from "./newfabric/colorpicker/colorpicker.module";
import { newFabricComponent } from "./newfabric/newfabric.component";

@NgModule({
    declarations:[
        newFabricComponent,
        FabricListComponent,
        fabricItemComponent,
        fabricsComponent
    ],
    imports:[
        sharedModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        FabricRoutingModule,
        colorpickerModule
    ],
})

export class FabricModule {}