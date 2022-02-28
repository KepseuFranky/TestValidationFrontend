import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Technicien } from '../technicien';
import { TestserviceService } from '../testservice.service';
import { TypeAction } from '../type-action';

@Component({
  selector: 'app-update-type-action',
  templateUrl: './update-type-action.component.html',
  styleUrls: ['./update-type-action.component.css']
})
export class UpdateTypeActionComponent implements OnInit {


  id!: string;
  nomAction!: string;
  typeAction: TypeAction = new TypeAction();
  TechnicieList!:Technicien[];
  constructor(private typeActionService: TestserviceService , private route: ActivatedRoute,  private router: Router) { }

    // Obtention de l'élément à modifier à l'ouverture de la page
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
  
      this.typeActionService.getTypeActionById(this.id).subscribe(data => {
        this.typeAction = data;
        this.nomAction=data.nomAction;
      }, error => console.log(error));
    }
  
    // Modifier une action et les actions des techniciens correspondant
    onSubmit(){

      // Modifier les actions des techniciens correspondant
      this.typeActionService.getTechniciensList().subscribe(data2 => {
        this.TechnicieList=data2;
        console.log(this.TechnicieList);
        for (var i=0; i<this.TechnicieList.length; i++){
          if(this.TechnicieList[i].typeActionId.indexOf(this.id) > -1){
            this.TechnicieList[i].typeAction=""+this.TechnicieList[i].typeAction.replace(""+this.nomAction,""+this.typeAction.nomAction);
            console.log(this.TechnicieList[i].typeAction);
            console.log(this.TechnicieList[i].id);
            this.typeActionService.updateTechnicien(this.TechnicieList[i].id, this.TechnicieList[i]).subscribe( data => {
            });
          }
        }
      });

      // Mis à jour de l'action
      this.typeActionService.updateTypeAction(this.id, this.typeAction).subscribe(data =>{
        this.goTo();
      }
      , error => console.log(error));
    }
  
    // Redirection vers la page initiale
    goTo(){
      this.router.navigate(['/testvalidation']);
    }


}
