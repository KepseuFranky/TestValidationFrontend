import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Technicien } from '../technicien';
import { TestserviceService } from '../testservice.service';
import { TypeAction } from '../type-action';
import { Location } from '@angular/common';
import { Observable, BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaincomponentComponent } from '../maincomponent/maincomponent.component'

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css']
})
export class TechnicienComponent implements OnInit {

  constructor(private technicienService:TestserviceService, private router: Router, private route: ActivatedRoute ) { }

  technicien: Technicien = new Technicien();
  nom!: any;
  nomTagtechnique!: any;
  nomTypeaction!: any;

  @Input() TagList: any;
  @Input() ActionList: any;

  technicienList!: Technicien[];
  TypeActionList!:TypeAction[];

  technicien$ !: Observable<Array<{ id: string,nom: string, tagtechnique: string, typeAction: string, tagtechniqueId: string, typeActionId: string;} >>;
  refreshTechniciens$ = new BehaviorSubject<boolean>(true);

  @Input() pasTag: any ;
  @Input() pasAction: any ;


  // Actualiser la liste des techniciens au démarrage de la page 
  ngOnInit(): void {
    this.technicien$=this.refreshTechniciens$.pipe(switchMap(_ => this.technicienService.getTechniciensList()));
    this.getTechniciens(); 
  }

  // Realiser l'ajout d'un technicien via le bouton valider
  onsubmit(){ 
    if(this.technicien.nom.length==0 || this.pasAction || this.pasTag ){
  
    }else{
    this.technicien.tagtechniqueId = this.TagList.filter((x: { isselected: boolean; })=>x.isselected==true).map((x: { id: any; })=>x.id).join(",").toString();
    this.technicien.tagtechnique = this.TagList.filter((x: { isselected: boolean; })=>x.isselected==true).map((x: { nom: any; })=>x.nom).join(",").toString();
    this.technicien.typeActionId = this.ActionList.filter((x: { isselected: boolean; })=>x.isselected==true).map((x: { id: any; })=>x.id).join(",").toString();
    this.technicien.typeAction = this.ActionList.filter((x: { isselected: boolean; })=>x.isselected==true).map((x: { nomAction: any; })=>x.nomAction).join(",").toString();
    this.saveTechnicien();
    this.refreshTechniciens$.next(false);
    this.ngOnInit();
    setTimeout(()=> {this.onReloadRoute();}, 600);
        }
  }

  // Actualiser la liste des techniciens
  getTechniciens(){
    this.technicien$=this.refreshTechniciens$.pipe(switchMap(_ => this.technicienService.getTechniciensList()));
    this.technicien$.subscribe(data => {
      this.technicienList = data;
    });
  }

  // Ajouter un technicien à la BD
  saveTechnicien(){
    this.technicienService.createTechnicien(this.technicien).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
    this.refreshTechniciens$.next(false);
  }

  // Rechercher suivant la colonne nom
  SearchbyNom(){
    if(this.nom == ""){
      this.ngOnInit();
    }else{
      console.log(this.nom);
      this.technicienList = this.technicienList.filter(res => {
        return res.nom.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    } 
  }


  // Rechercher suivant la colonne Tag Technique
  SearchbyTagTechnique(){
    if(this.nomTagtechnique == ""){
      this.ngOnInit();
    }else{
      console.log(this.nomTagtechnique);
      this.technicienList = this.technicienList.filter(res => {
        return res.tagtechnique.toLocaleLowerCase().match(this.nomTagtechnique.toLocaleLowerCase());
      });
    } 
  }

  // Rechercher suivant la colonne Type Action
  SearchbyTypeAction(){
    if(this.nomTypeaction == ""){
      this.ngOnInit();
    }else{
      console.log(this.nomTypeaction);
      this.technicienList = this.technicienList.filter(res => {
        return res.typeAction.toLocaleLowerCase().match(this.nomTypeaction.toLocaleLowerCase());
      });
    } 
  }

  onReloadRoute(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {relativeTo: this.route});
  }


}
