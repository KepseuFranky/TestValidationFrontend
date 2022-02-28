import { PathLocationStrategy } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { TagTechnique } from '../tag-technique';
import { TypeAction } from '../type-action';

@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.css']
})
export class MaincomponentComponent implements OnInit {


  TagTechniqueListInt2: TagTechnique[]= [];
  TypeActionListInt2:TypeAction[] = [];
  pasTagInt = true;
  pasActionInt = true;

  constructor(private router: Router) { }


  ngOnInit()
  {
 
  }

  // Reception de la liste des tag techniques
  SendData(value: TagTechnique[]){
    this.TagTechniqueListInt2=value;
  }

  // Reception de la liste des type actions
  SendData2(value: TypeAction[]){
    this.TypeActionListInt2=value;
  }


  SendDataBool(value: boolean){
    this.pasTagInt=value;
  }

  SendDataBool2(value: boolean){
    this.pasActionInt=value;
  }

}



