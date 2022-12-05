import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
  })


export class  colorService {
            hue: string;
            gradient: number;
    public hueChanges = new BehaviorSubject<string>(null);
            color: string;
            fullcolor = new BehaviorSubject<string>(null);

    getColor() {
            return this.fullcolor;
    }

    changeColor(color:string){
        this.color = color;
        this.fullcolor.next(color);
        return this.color;
    }

    getHue(){
        return this.hueChanges;
    }

    changeHue(hue:string){
        this.hue = hue;
        this.hueChanges.next(hue);
        console.log(hue);
        return this.hue;
        
    }

    getHueFromColor(color:string){
        color.slice(4, -1);
        const r =+(this.color.split(",")[0]).slice(0,-1);
        const g =+this.color.split(",")[1];
        const b =+(this.color.split(",")[2]).slice(1);

        if (r == g && r == b ) {
            this.gradient = 1;
            this.hue="rgb(255,0,0)";
            this.hueChanges.next(this.hue);
        }
        if (g==255 && b==0) {}


    }
} 