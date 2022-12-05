export class Pattern {
    public name: string;
    public imgURL: string;
    public colorBlockOpt: number;
    public pocketOpt: boolean;
    
    constructor(name:string, imgURL:string,  colorBlockOpt:number, pocketOpt:boolean){
        this.name=name;
        this.imgURL=imgURL;
        this.colorBlockOpt = colorBlockOpt;
        this.pocketOpt=pocketOpt;
    }
}