import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';
import { CreerutilisateurComponent } from './utilisateur/creerutilisateur/creerutilisateur.component';
import { ModifierticketComponent } from './ticket/modifierticket/modifierticket.component';
import { ModifierutilisateurComponent } from './utilisateur/modifierutilisateur/modifierutilisateur.component';
import { AfficherticketComponent } from './ticket/afficherticket/afficherticket.component';
import { AfficherutilisateurComponent } from './utilisateur/afficherutilisateur/afficherutilisateur.component';
import { CommonModule } from '@angular/common';
import { AdminboardComponent } from './dashboard/adminboard/adminboard.component';
import { UtilisateurboardComponent } from './dashboard/utilisateurboard/utilisateurboard.component';
import { ModifierprofileComponent } from './dashboard/utilisateurboard/modifierprofile/modifierprofile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CreerticketComponent,
    LoginComponent,
    CreerutilisateurComponent,
    ModifierticketComponent,
    ModifierutilisateurComponent,
    AfficherticketComponent,
    AfficherutilisateurComponent,
    AdminboardComponent,
    UtilisateurboardComponent,
    ModifierprofileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
