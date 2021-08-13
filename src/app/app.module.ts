import { NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';
import { LoginComponent } from './login/login.component';
import { CreerutilisateurComponent } from './utilisateur/creerutilisateur/creerutilisateur.component';
import { ModifierticketComponent } from './ticket/modifierticket/modifierticket.component';
import { ModifierutilisateurComponent } from './utilisateur/modifierutilisateur/modifierutilisateur.component';
import { AfficherticketComponent } from './ticket/afficherticket/afficherticket.component';
import { AfficherutilisateurComponent } from './utilisateur/afficherutilisateur/afficherutilisateur.component';
import { CommonModule } from '@angular/common';
import { ModifierprofileComponent } from './utilisateur/profile/modifierprofile/modifierprofile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardTechnicienComponent } from './board-technicien/board-technicien.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from './utilisateur/profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './_service/auth.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { ResoudreticketComponent } from './ticket/resoudreticket/resoudreticket.component';
import { RouterModule } from '@angular/router';
import { DetailsticketComponent } from './ticket/detailsticket/detailsticket.component';
import { MatSelectModule } from '@angular/material/select';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StockComponent } from './stock/stock.component';
import { AfficherstockComponent } from './stock/afficherstock/afficherstock.component';
import { CreerstockComponent } from './stock/creerstock/creerstock.component';
import { ModifierstockComponent } from './stock/modifierstock/modifierstock.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { SimplelayoutComponent } from './containers/simplelayout/simplelayout.component';
import { AfficherticketadminComponent } from './ticket/afficherticketadmin/afficherticketadmin.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';





@NgModule({
  declarations: [
    AppComponent,
    CreerticketComponent,
    LoginComponent,
    CreerutilisateurComponent,
    ModifierticketComponent,
    ModifierutilisateurComponent,
    AfficherticketComponent,
    AfficherutilisateurComponent,
    ModifierprofileComponent,
    BoardAdminComponent,
    BoardTechnicienComponent,
    BoardUserComponent,
    ProfileComponent,
    HomeComponent,
    ResoudreticketComponent,
    DetailsticketComponent,
    MatConfirmDialogComponent,
    StockComponent,
    AfficherstockComponent,
    CreerstockComponent,
    ModifierstockComponent,
    SimplelayoutComponent,
    AfficherticketadminComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularMaterialModule,
    RouterModule,
    MatSelectModule,
    MatDialogModule,
    InputNumberModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    NgbModule,
    NgbModalModule,
    Ng2SearchPipeModule


  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,],

  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [AfficherutilisateurComponent, MatConfirmDialogComponent]
})
export class AppModule { }
