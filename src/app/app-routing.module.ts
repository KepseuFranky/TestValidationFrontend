import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UpdateTypeActionComponent } from './update-type-action/update-type-action.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { TypeactionComponent } from './typeaction/typeaction.component';


const routes: Routes = [
  {path: 'testvalidation', component: MaincomponentComponent},
  {path: 'updateaction/:id', component: UpdateTypeActionComponent},
  {path: '', redirectTo: 'testvalidation', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
