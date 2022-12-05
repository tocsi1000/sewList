import { Component, OnDestroy, OnInit } from "@angular/core";
import { Fabric } from "../fabric.model";
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { colorService } from "src/app/fabrics/newfabric/colorpicker/Color.service";
import { FabricsService } from "../fabrics.service";
import { type } from "../types.model";
import { AuthService } from "src/app/auth/auth.service";


@Component({
    selector: 'app-newfabric',
    templateUrl: './newfabric.component.html',
    styleUrls:['./newfabric.component.css']
})
export class newFabricComponent implements OnInit, OnDestroy {
    isLoading=false;
    isPlain=true;
    myForm: FormGroup;
    PlainSub: Subscription;
    paramsSub: Subscription;
    fbSub: Subscription;
    colSub: Subscription;
    currentColor:string;
    imageError:string;
    fileUploaded:boolean=false;
    shouldhaveUpload=false;
    imgBase64Path:string;

    editMode=false;
    editedID:number;
    editedFabric:Fabric;
    userID:string;

    constructor(private fabServ:FabricsService,
                private colServ: colorService,
                private actRoute: ActivatedRoute,
                private auth:AuthService
                ){}
    

    ngOnInit(): void{
        this.initForm();
        this.userID=this.auth.getLoggedUserID();
        this.paramsSub=this.actRoute.queryParams.subscribe(params=>{
            this.editedID=params.id;
            if (params.id) {
                this.editMode=true;
                this.fbSub=this.fabServ.FListUpdated.subscribe(response => {
                    if (response) {
                        this.editForm();
                    }})
                
            } else {
                this.editMode=false;
            }             
        }); 
    }

    
    private  initForm(){

        this.myForm = new FormGroup({
            name: new FormControl('', Validators.required),
            type: new FormControl('', Validators.required),
            PorP: new FormControl('plain', Validators.required),
            uplpoadIMG: new FormControl(),
            imageRGB: new FormControl('', [Validators.required, Validators.minLength(3)])
         })

         this.PlainSub = this.myForm.controls['PorP'].valueChanges.subscribe(value => {
            if (value==='plain') {
                this.isPlain=true;
                this.myForm.controls['imageRGB'].setValidators(Validators.required);
                this.myForm.controls['imageRGB'].setValidators(Validators.minLength(3));
                this.shouldhaveUpload=false;
            } else {
                this.isPlain=false;
                this.myForm.controls['imageRGB'].setValidators(null);
                this.shouldhaveUpload=true;
                
            }
            this.myForm.controls['imageRGB'].updateValueAndValidity();
            });  
            
            this.colSub=this.colServ.fullcolor.subscribe(
                color => {
                    this.currentColor=color;
                    this.myForm.patchValue({
                        imageRGB: color
                    })
                }
            )           

         }
        
    editForm(){
                this.editedFabric=this.fabServ.getFabricbyID(this.editedID);         
                this.myForm.controls['PorP'].patchValue(this.editedFabric.PorP);  
                this.myForm.controls['name'].patchValue(this.editedFabric.name);
                this.myForm.controls['type'].patchValue(this.editedFabric.type);
                if(this.editedFabric.PorP !== 'plain') {
                    this.isPlain=false;
                    this.imgBase64Path=this.editedFabric.color;
                    this.shouldhaveUpload=false;
                    this.fileUploaded=true;
                } else {
                    this.isPlain=true;
                    this.colServ.changeColor(this.editedFabric.color);
                    //gethue
                    this.myForm.controls['imageRGB'].patchValue(this.editedFabric.color);
                }

    }     

    ngOnDestroy(){
        this.PlainSub.unsubscribe();
        this.paramsSub.unsubscribe();
        if (this.editMode){
            this.fbSub.unsubscribe();
        }
        this.colSub.unsubscribe();
        this.myForm.reset();

    }

    onSaveFabric(){
         this.isLoading=true;
        const name:string = this.myForm.get('name').value;
        const type:type = this.myForm.get('type').value;
        const PorP:string = this.myForm.get('PorP').value;
        let color:string=null; 
            if (this.myForm.get('PorP').value=='printed') {
                if(this.fileUploaded) {
                    color=this.imgBase64Path;
                } else {
                    color= this.myForm.get('imageURL').value;
                }
            } else {
                color= this.colServ.fullcolor.getValue();
            }
        const newfabric= new Fabric(name, type, PorP, color, this.userID);

            if (this.editMode){
                this.fabServ.editFabric(this.editedID, newfabric)
            } else {
                this.fabServ.savenewFabric(newfabric);  
            } 
            
        }

    onUpload(fileInput:any) {
        this.imageError = null;
        if (fileInput.target.files && fileInput.target.files[0]) {
            const max_height = 1000;
            const max_width = 1000;

            const reader = new FileReader();
            reader.onload = (e: any) => {
                const image = new Image();
                image.src = e.target.result;
                image.onload = rs => {
                    const img_height = rs.currentTarget['height'];
                    const img_width = rs.currentTarget['width'];

                    if (img_height > max_height && img_width > max_width) {
                        this.imageError =
                            'Maximum size allowed ' +
                            max_height +
                            '*' +
                            max_width +
                            'px';
                        return false;
                    } else {
                        this.imgBase64Path = e.target.result;
                        this.shouldhaveUpload=false;
                        this.fileUploaded=true;
                    }
                };
            };

            reader.readAsDataURL(fileInput.target.files[0]);
        }
    }
        
    removeImage(){
        this.fileUploaded=false;
        this.imgBase64Path=null;
        this.shouldhaveUpload=true;

    }

}


