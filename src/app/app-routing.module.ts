import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfficherticketComponent } from './ticket/afficherticket/afficherticket.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';
import { CreerutilisateurComponent } from './utilisateur/creerutilisateur/creerutilisateur.component';
import { ModifierticketComponent } from './ticket/modifierticket/modifierticket.component';
import { AfficherutilisateurComponent } from './utilisateur/afficherutilisateur/afficherutilisateur.component';
import { ModifierprofileComponent } from './utilisateur/profile/modifierprofile/modifierprofile.component';
import { ModifierutilisateurComponent } from './utilisateur/modifierutilisateur/modifierutilisateur.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './utilisateur/profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardTechnicienComponent } from './board-technicien/board-technicien.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './auth.guard';
import { DetailsticketComponent } from './ticket/detailsticket/detailsticket.component';
import { ResoudreticketComponent } from './ticket/resoudreticket/resoudreticket.component';
import { AfficherstockComponent } from './stock/afficherstock/afficherstock.component';
import { CreerstockComponent } from './stock/creerstock/creerstock.component';
import { ModifierstockComponent } from './stock/modifierstock/modifierstock.component';
import { AfficherticketadminComponent } from './ticket/afficherticketadmin/afficherticketadmin.component';
import { AfficherticketaffecteComponent } from './ticket/afficherticketaffecte/afficherticketaffecte.component';



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardTechnicienComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'detailsticket/:id', component: DetailsticketComponent },
  { path: 'adduser', component: CreerutilisateurComponent },
  { path: 'ticket', component: AfficherticketComponent },
  { path: 'ticketadmin', component: AfficherticketadminComponent },
  { path: 'ticketaffecte', component: AfficherticketaffecteComponent },
  { path: 'stock', component: AfficherstockComponent },
  { path: 'creerticket', component: CreerticketComponent },
  { path: 'creerstock', component: CreerstockComponent },
  { path: 'updateticket/:id', component: ModifierticketComponent },
  { path: 'resoudre/:id', component: ResoudreticketComponent },
  { path: 'users', component: AfficherutilisateurComponent, },
  { path: 'updateprofil', component: ModifierprofileComponent },
  { path: 'updateuser/:id', component: ModifierutilisateurComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
