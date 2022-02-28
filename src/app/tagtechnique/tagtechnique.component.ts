import { Component,Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagTechnique } from '../tag-technique';
import { TestserviceService } from '../testservice.service';
import { Observable, BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tagtechnique',
  templateUrl: './tagtechnique.component.html',
  styleUrls: ['./tagtechnique.component.css']
})
export class TagtechniqueComponent implements OnInit {

  [x: string]: any;
  @Output() public SendData = new EventEmitter<TagTechnique[]>();
  @Output() public SendDataBool = new EventEmitter<boolean>();
  tagTechnique: TagTechnique = new TagTechnique();
  TagTechniqueList!:TagTechnique[];
  tagtechnique$ !: Observable<Array<{id: string, nom: string, isselected : boolean;} >>;
  refreshTagTechniques$ = new BehaviorSubject<boolean>(true);
  pasTag = true;
  k! :number ;

  


  constructor(private testserviceService: TestserviceService,private router: Router, private route: ActivatedRoute) { }


  //Actualiser la liste des tag techniques au démarrage de la page

  ngOnInit(): void {
    this.tagtechnique$=this.refreshTagTechniques$.pipe(switchMap(_ => this.testserviceService.getTagTechniquesList())); 
    this.getTagTechniques();
    this.NoTagTechnique();
    
  }

  // Obtenir la liste des tag techniques de la base de données
  getTagTechniques(){
    this.tagtechnique$.subscribe(data => {
      this.TagTechniqueList = data;
      this.SendData.emit(this.TagTechniqueList);
    });
  }

    
  // Ajouter un tag technique à la BD et actualiser la liste des tag techniques
  saveTagTechnique(){
    this.testserviceService.createTagTechnique(this.tagTechnique).subscribe( data =>{
      console.log(data);
    },
    error => console.log(error));
    this.refreshTagTechniques$.next(false);
    this.getTagTechniques();
  }

  // Fonction appelée par le bouton Add pour ajouter un nouveau tag technique
  addTagTechnique(){
    
    console.log(this.tagTechnique.nom.length);
    if(this.tagTechnique.nom.length==0){

    }else{
      this.saveTagTechnique(); 
      setTimeout(()=> {this.onReloadRoute();}, 450);
    }
  }

  // Recharger la page après ajout 
  onReloadRoute(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {relativeTo: this.route});
  }

  // Vérifier si aucun élément de la liste tag technique n'est coché
  NoTagTechnique(){
    this.k=0;
    for (var i=0; i<this.TagTechniqueList.length; i++){
          if(this.TagTechniqueList[i].isselected){
              this.pasTag=false;
          }else{
            this.k= this.k +1;
          }
    }
    if(this.k==this.TagTechniqueList.length){
      this.pasTag=true;
    }
    this.SendDataBool.emit(this.pasTag);
  }

}
