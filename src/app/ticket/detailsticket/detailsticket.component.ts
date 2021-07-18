import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { Utilisateur } from 'src/app/_models/utilisateur';
import { TicketService } from 'src/app/_service/ticket.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import { UtilisateurService } from 'src/app/_service/utilisateur.service';


@Component({
  selector: 'app-detailsticket',
  templateUrl: './detailsticket.component.html',
  styleUrls: ['./detailsticket.component.css'],
})

export class DetailsticketComponent implements OnInit {

  isLoggedIn = false;
  isAddMode: boolean;
  ticket: any = {};
  ticket_id: number;
  url: any
  statut: any;
  user = null;
  users = null;
  private roles: string[];
  form: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private utilisateurservice: UtilisateurService,
    private TicketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService,

  ) { }

  ngOnInit() {
    this.utilisateurservice.getAll().subscribe((data) => {
      this.users = data
    })
    this.user = this.token.getUser();
    this.roles = this.user.roles;
    this.statut = this.ticket.statut;
    this.ticket_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.ticket_id;
    this.TicketService.get(this.ticket_id).subscribe((data) => {
      this.ticket = data
      console.log("user" + this.ticket)
    })

    this.form = this.formBuilder.group({
      attribuea: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.TicketService.get(this.ticket_id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }
  
  updateStatus2() {
    const link = ['/ticket'];
    console.log('**********************here')
    this.ticket.statut = 'Resolu'
    this.TicketService.update(this.ticket_id, this.ticket).subscribe((data) => {
      this.ticket = data
      console.log("user" + this.ticket)
    })
    this.ngOnInit();
    this.router.navigate(link);

  }

  updateStatus1() {
    console.log('**********************here')
    this.ticket.statut = 'En cours'
    this.ticket.attribuea = this.form.controls.attribuea.value;
    console.log('test', this.ticket.attribuea)

    this.TicketService.update(this.ticket_id, this.ticket).subscribe((data) => {
      this.ticket = data

      console.log("user" + this.ticket)

    })
    this.router.navigate([`/resoudre/${this.ticket_id}`])
  }

  affecterticket() {

  }
}
