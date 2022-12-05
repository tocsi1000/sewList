import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ColorPickerModule } from "ngx-color-picker";
import { ColorpaletteComponent } from "./colorpalette/colorpalette.component";
import { ColorPickerComponent } from "./colorpicker.component";
import { ColorsliderComponent } from "./colorslider/colorslider.component";

@NgModule({
    imports: [CommonModule, ColorPickerModule],
    declarations: [ColorPickerComponent,
                ColorsliderComponent,
                ColorpaletteComponent],
    exports: [ColorPickerComponent],
})
export class colorpickerModule {}