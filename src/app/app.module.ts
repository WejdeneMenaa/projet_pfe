import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { TicketComponent } from './ticket/ticket.component';
import { CreerticketComponent } from './ticket/creerticket/creerticket.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    TicketComponent,
    CreerticketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
