import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TagTechnique } from './tag-technique';
import { TypeAction } from './type-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) { }


  ngOnInit()
  {
 
  }
}