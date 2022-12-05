import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxCaptureModule } from "ngx-capture";
import { AppRoutingModule } from "../app-routing.module";
import { AuthGuard } from "../auth/auth.guard";
import { sharedModule } from "../shared/shared.module";
import { ColoringComponent } from "./coloring/coloring.component";
import { CreateNewProjectComponent } from "./createnew.component";
import { FourseasonsComponent } from "./patterns/fourseasons/fourseasons.component";
import { RaglanLComponent } from "./patterns/raglan-l/raglan-l.component";
import { RaglandressComponent } from "./patterns/raglandress/raglandress.component";
import { SweaterComponent } from "./patterns/sweater/sweater.component";
import { PickedColorComponent } from "./picked-color/picked-color.component";
import { OptionsService } from "./setup/options.service";
import { SetupComponent } from "./setup/setup.component";

@NgModule({
    declarations: [
        CreateNewProjectComponent,
        SetupComponent,
        PickedColorComponent,
        ColoringComponent,
        FourseasonsComponent,
        RaglanLComponent,
        RaglandressComponent,
        SweaterComponent],
    imports: [
        RouterModule.forChild([
            {path: '', component: CreateNewProjectComponent, 
            canActivate: [AuthGuard], children: [
                {path: 'setup', component: SetupComponent}
            ]},
        ]),
        sharedModule,
        FormsModule,
        CommonModule,
        NgxCaptureModule,
    ],
    providers:  [OptionsService]
})

export class CreateNewProjectModule{}