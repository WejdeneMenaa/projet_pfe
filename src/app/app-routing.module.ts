import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AfficherticketComponent } from './ticket/afficherticket/afficherticket.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';
import { CreerutilisateurComponent } from './utilisateur/creerutilisateur/creerutilisateur.component';
import { ModifierticketComponent } from './ticket/modifierticket/modifierticket.component';
import { AfficherutilisateurComponent } from './utilisateur/afficherutilisateur/afficherutilisateur.component';
import { AdminboardComponent } from './dashboard/adminboard/adminboard.component';
import { UtilisateurboardComponent } from './dashboard/utilisateurboard/utilisateurboard.component';
import { ModifierprofileComponent } from './dashboard/utilisateurboard/modifierprofile/modifierprofile.component';
import { ModifierutilisateurComponent } from './utilisateur/modifierutilisateur/modifierutilisateur.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardTechnicienComponent } from './board-technicien/board-technicien.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './auth.guard';
import { DetailsticketComponent } from './ticket/detailsticket/detailsticket.component';
import { ResoudreticketComponent } from './ticket/resoudreticket/resoudreticket.component';




const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardTechnicienComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'detailsticket/:id', component: DetailsticketComponent },
  { path: 'adduser', component: CreerutilisateurComponent },
  { path: 'ticket', component: AfficherticketComponent },
  { path: 'creerticket', component: CreerticketComponent },
  { path: 'updateticket/:id', component: ModifierticketComponent },
  { path: 'resoudre/:id', component: ResoudreticketComponent },
  { path: 'users', component: AfficherutilisateurComponent, },
  { path: 'updateprofil', component: ModifierprofileComponent },
  { path: 'updateuser/:id', component: ModifierutilisateurComponent },
  { path: '', component: AccueilComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
