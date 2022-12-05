import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Dropdowndirective } from "./dropdown.directive";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
    declarations: [
        LoadingComponent,
        Dropdowndirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Dropdowndirective,
        LoadingComponent
    ]
})

export class sharedModule{}