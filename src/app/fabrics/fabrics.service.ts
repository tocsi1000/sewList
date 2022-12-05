import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Fabric } from "./fabric.model";


@Injectable({providedIn:"root"})

export class FabricsService {
    
    fabricList: Fabric[] = []
    printedFabrics: Fabric[] = [];
    hoveredFabric: Fabric;
    isHovered = new BehaviorSubject<boolean>(false);
    userID:string=null;
    public FListUpdated = new BehaviorSubject<Fabric[]>(null);
    public selectedFabricColor = new Subject<Fabric>();

    constructor(private http:HttpClient,
                private auth:AuthService,
                private router:Router){}

    savenewFabric(newFabric:Fabric){
        this.http.post('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/fabrics.json',newFabric)
        .subscribe(
            resp => {
                this.loadFabrics();

            }
        )
    }

    storeFabric(){
        this.http.put('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/fabrics.json', this.fabricList)
        .subscribe(resp => {
            this.loadFabrics()})
    }

    deleteFabric(i:number){
        this.fabricList.splice(i,1);
        this.FListUpdated.next(this.fabricList);
        this.storeFabric();
    }

    getFabrics(){
       return this.fabricList;  
    }

    getPrintedFabrics(){
        for (let fabric of this.getFabrics()) {
            if(fabric.PorP==='printed') {
                if (fabric.name.includes(" ")
                ) {
                    fabric.name=fabric.name.split(" ").join(".");
                }
                this.printedFabrics.push(fabric); 
        }
        } return  this.printedFabrics;
    }


    setSelectedFabricColor(fabric:Fabric){
        this.selectedFabricColor.next(fabric);
    }

    getSelectedFabricColor(){
        return this.selectedFabricColor;
    }
 
    getFabricbyID(id:number){
        return this.fabricList[id];
    }

    setHoveredFabric(i){
        this.isHovered.next(true);
        this.hoveredFabric=this.fabricList[i];
    }

    getHoveredFabric(){
       return this.hoveredFabric;
    }

    editFabric(id:number, fabric:Fabric){
        this.fabricList[id].name=fabric.name;
        this.fabricList[id].type=fabric.type;
        this.fabricList[id].PorP=fabric.PorP;
        this.fabricList[id].color=fabric.color;
        this.FListUpdated.next(this.fabricList);
        console.log(this.fabricList);
        this.storeFabric();
    }

    loadFabrics(){
        this.http.get<Fabric[]>('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/fabrics.json')
        .pipe(map((data) => {
             const fabArray:Fabric[]=[];
             this.userID=this.auth.getLoggedUserID();
             for (const key in data){
                if ({...data[key]}.userID===this.userID) {

                 fabArray.push({...data[key]})
                }
             } return fabArray;
             } 
        ))
        .subscribe(fabrics =>{
            this.fabricList=fabrics;
            this.FListUpdated.next(this.fabricList);
            this.router.navigate(['/fabrics']);
        }
         );
     }
}