import { Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})

export class Dropdowndirective {
    @HostBinding('class.open') isclicked = false;

    constructor(private eRef:ElementRef){}

    @HostListener('document:click', ['$event'])
    clickout(event) {
      if(this.eRef.nativeElement.contains(event.target)) {
        this.isclicked = !this.isclicked;
      } else {
        this.isclicked = false;
      }
    }    


}
