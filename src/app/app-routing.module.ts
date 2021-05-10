import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';


const routes: Routes = [
  {path: '', component:AccueilComponent,children:[
    {path: 'ticket', component:TicketComponent},
    {path: 'creerticket', component:CreerticketComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
