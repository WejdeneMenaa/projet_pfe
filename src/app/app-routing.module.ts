import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
    {path: '', component:AccueilComponent},
    {path: 'ticket', component:TicketComponent},
    {path: 'creerticket', component:CreerticketComponent},
    {path: 'login', component:LoginComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
