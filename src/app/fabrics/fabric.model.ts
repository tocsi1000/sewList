import {type} from './types.model'
export class Fabric {

    public name: string;
    public type : type;
    public PorP: string
    public color: string;
    public userID: string;

    constructor(name:string, type:type, PorP:string, color:string, userID:string){
        this.name=name;
        this.type=type;
        this.PorP=PorP;
        this.color=color;
        this.userID=userID;
    }
}