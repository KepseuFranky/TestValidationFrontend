import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeAction } from '../type-action';
import { TestserviceService } from '../testservice.service';
import { Observable, BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Technicien } from '../technicien';

@Component({
  selector: 'app-typeaction',
  templateUrl: './typeaction.component.html',
  styleUrls: ['./typeaction.component.css']
})
export class TypeactionComponent implements OnInit {

  // Envoie de la liste des type action vers mainComponent
  @Output() public SendData2 = new EventEmitter<TypeAction[]>();
  @Output() public SendDataBool2 = new EventEmitter<boolean>();

  typeAction: TypeAction = new TypeAction(); 
  nomTypeaction: string="";

  TypeActionList!:TypeAction[];
  TechnicieList!:Technicien[];

  typeaction$ !: Observable<Array<{id: string, nomAction: string, isselected : boolean;} >>;
  refreshTypeAction$ = new BehaviorSubject<boolean>(true);

  pasAction = true;
  k!: number;
  constructor(private typeActionService: TestserviceService, private router: Router, private route: ActivatedRoute) { }

  // Actualiser la liste des actions au démarrage
  ngOnInit(): void {
    this.typeaction$=this.refreshTypeAction$.pipe(switchMap(_ => this.typeActionService.getTypeAction())); 
    this.getTypeAction();
  }

  // Actualiser la liste des actions 
  getTypeAction(){
    this.typeaction$.subscribe(data => {
      this.TypeActionList = data;
      this.SendData2.emit(this.TypeActionList); //Envoie de la liste des type action vers mainComponent
    });
  }

  // Ajouter une nouvelle action à la BD
  saveTypeAction(){
    this.typeActionService.createTypeAction(this.typeAction).subscribe( data =>{


    },
    error => console.log(error)); 
    this.refreshTypeAction$.next(false);
    }

  // Ajouter une action via le bouton Add
  addTypeAction(){
    console.log(this.typeAction.nomAction.length);
    if(this.typeAction.nomAction.length==0){

    }else{
      this.saveTypeAction();
      setTimeout(()=> {this.onReloadRoute();}, 450);
    }
  }

  // Effacer une action et éffacer les techniciens correspondant
   deleteTypeAction(id: string){

    // Obtention et suppréssion des techniciens correspondant
     this.typeActionService.getTechniciensList().subscribe(data2 => {
      this.TechnicieList=data2;
      for (var i=0; i<this.TechnicieList.length+1; i++){
        console.log(this.TechnicieList[i].typeActionId.indexOf(id) > -1);
        if(this.TechnicieList[i].typeActionId.indexOf(id) > -1){
          this.typeActionService.deleteTechnicien(this.TechnicieList[i].id).subscribe( data => {
            console.log(data);
          });
        }
      }
    });

    // Suppression de l'action
    this.typeActionService.deleteTypeAction(id).subscribe( data => {
      this.getTypeAction();
    });
    setTimeout(()=> {this.onReloadRoute();}, 600);
  }

  // rediriger vers la page de mise à jour des actions
  updateAction(id: string){
    this.router.navigate(['updateaction', id]);
  }

  // Recharger la page après ajout 
  onReloadRoute(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {relativeTo: this.route});
  }

  // Vérifier si aucun élément de la liste tag technique n'est coché
  NoTypeAction(){
      this.k=0;
      for (var i=0; i<this.TypeActionList.length; i++){
            if(this.TypeActionList[i].isselected){
                this.pasAction=false;
            }else{
              this.k= this.k +1;
            }
      }
      if(this.k==this.TypeActionList.length){
        this.pasAction=true;
      }
      this.SendDataBool2.emit(this.pasAction);
    }


}
