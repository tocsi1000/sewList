import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";

import { PlansComponent } from "./plans/plans.component";

const AppRout: Routes = [
    {path: '', redirectTo:'signin', pathMatch:'full'},

    {path: 'plans', component: PlansComponent, canActivate: [AuthGuard]},

    {path: 'newproject', 
    loadChildren: ()=> import('../app/createnew/createnew.module').then(m=>m.CreateNewProjectModule)},
    
    {path: 'fabrics', 
    loadChildren: ()=> import('../app/fabrics/fabrics.module').then(m=>m.FabricModule)},
        
    {path: 'signin', 
    loadChildren: ()=> import('../app/auth/auth.module').then(m => m.AuthModule)},
    
]



@NgModule({
    imports:[
        RouterModule.forRoot(AppRout,{preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}