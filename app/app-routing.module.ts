import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPersonasComponent } from './component/list-personas/list-personas.component';

const routes: Routes = [
  {path : 'contactos',component: ListPersonasComponent},
  {path : '', redirectTo: 'contactos', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
