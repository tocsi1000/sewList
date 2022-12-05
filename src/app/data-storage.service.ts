import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Subject, take } from "rxjs";
import { AuthService } from "./auth/auth.service";
import { Pattern } from "./createnew/setup/pattern.model";
import { Plan } from "./plans/plan.model";

@Injectable({providedIn:"root"})
export  class dataStorageService {
    public allPatterns: Pattern[];
    allPlans: Plan[] = [];
    plansUpdated = new Subject();
    id:string;
    
    constructor(private http:HttpClient,
                private router:Router,
                private auth:AuthService) {}

    

    loadAllPatterns(){   
        return this.allPatterns =  
        [new Pattern('Raglan tshirt', '../assets/patternimages/raglantshirt.jpg', 3, false),
        new Pattern('Joggers', '../assets/patternimages/joggers.jpg', 2, true),
        new Pattern('Raglan dress', '../assets/patternimages/raglandress.jpg', 3, true),
        new Pattern('Sweater', '../assets/patternimages/sweater.jpg', 2, true)]    
    }

    loadAllPlans(){
        this.http.get<Plan[]>('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/plans.json')
        .pipe(map((data) => {
            this.id=this.auth.getLoggedUserID();
            const plans:Plan[]=[];
            for (const key in data){
                
                if ({...data[key]}.userID===this.id) {
                    plans.push({...data[key]})
                }
            } return plans;
            } 
       ))
       .subscribe(plans =>{
           this.allPlans=plans;
           this.plansUpdated.next(this.allPlans);
       }
        );
    }

    getPlans(){
        return this.allPlans;
    }

    savePlan(img:string){
        this.id=this.auth.getLoggedUserID();
        const plan= new Plan(img, false, this.id)
        this.http.post('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/plans.json', plan)
        .subscribe(resp => {
            this.router.navigate(['/plans']);

        })
        

    }

    markDone(i:number){
        this.allPlans[i].isDone = !this.allPlans[i].isDone;
        this.plansUpdated.next(this.allPlans);
        this.saveAllPlans();
    }

    deletePlan(i:number){
        this.allPlans.splice(i, 1);
        this.saveAllPlans();
    }

    saveAllPlans() {
        this.http.put('https://sewlist2-default-rtdb.europe-west1.firebasedatabase.app/plans.json', this.allPlans)
        .subscribe(resp => {console.log('All changes are saved.')})
    }
}