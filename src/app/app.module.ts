import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { TagtechniqueComponent } from './tagtechnique/tagtechnique.component';
import { TypeactionComponent } from './typeaction/typeaction.component';
import { UpdateTypeActionComponent } from './update-type-action/update-type-action.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    TechnicienComponent,
    TagtechniqueComponent,
    TypeactionComponent,
    UpdateTypeActionComponent,
    MaincomponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
