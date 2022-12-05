import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { FabricListComponent } from "./fabriclist/fabriclist.component";
import { fabricsComponent } from "./fabrics.component";
import { newFabricComponent } from "./newfabric/newfabric.component";

const routes:Routes = [
    {path:'', component:fabricsComponent, 
        canActivate: [AuthGuard],    
        children: [
            {path:'', component:FabricListComponent},
            {path:'newfabric', component:newFabricComponent},
            {path:':id/edit', component:newFabricComponent},            
        ]},
]


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FabricRoutingModule {}