import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ModifierticketComponent } from './ticket/modifierticket/modifierticket.component';
import { CreerutilisateurComponent } from './utilisateur/creerutilisateur/creerutilisateur.component';
import { ModifierutilisateurComponent } from './utilisateur/modifierutilisateur/modifierutilisateur.component';
import { AfficherticketComponent } from './ticket/afficherticket/afficherticket.component';
import { AfficherutilisateurComponent } from './utilisateur/afficherutilisateur/afficherutilisateur.component';
import { CommonModule } from '@angular/common';
import { AdminboardComponent } from './dashboard/adminboard/adminboard.component';
import { UtilisateurboardComponent } from './dashboard/utilisateurboard/utilisateurboard.component';
import { ModifierprofileComponent } from './dashboard/utilisateurboard/modifierprofile/modifierprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    CreerticketComponent,
    LoginComponent,
    RegisterComponent,
    ModifierticketComponent,
    CreerutilisateurComponent,
    ModifierutilisateurComponent,
    AfficherticketComponent,
    AfficherutilisateurComponent,
    AdminboardComponent,
    UtilisateurboardComponent,
    ModifierprofileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
