export class Plan {
    public picPNG: string;
    public isDone: boolean;
    public userID: string;
    
    constructor(picPNG:string, isDone:boolean, userID:string){
        this.picPNG=picPNG;
        this.isDone=isDone;
        this.userID=userID;
    }
}