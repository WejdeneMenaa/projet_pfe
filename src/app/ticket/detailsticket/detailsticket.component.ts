import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ticket_id: string;
  url: any
  statut: any;
  attribuea: string;
  user = null;
  users = null;;
  private roles: string[];
  form: FormGroup;
  id: number;



  constructor(
    private formBuilder: FormBuilder,
    private utilisateurservice: UtilisateurService,
    private TicketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService,

  ) { }

  ngOnInit() {
    this.ticket_id = this.route.snapshot.params['id'];

    if (this.token.getToken()) {
      this.user = this.token.getUser();
    }

    this.utilisateurservice.get(this.token.getUser()).subscribe((data) => {
      this.user = data
      console.log("user" + this.user)
    })

    this.utilisateurservice.getAll().subscribe((data) => {
      this.users = data
      console.log("users" + this.users)
    })

    this.roles = this.user.roles;
    this.id = this.user.id;
    this.statut = this.ticket.statut;
    this.isAddMode = !this.ticket_id;
    this.TicketService.get(this.ticket_id).subscribe((data) => {
      this.ticket = data
    })

    this.form = this.formBuilder.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_creation: ['', Validators.required],
      date_echeance: ['', Validators.required],
      statut: ['', [Validators.required]],
      type: ['', [Validators.required]],
      priorite: ['', [Validators.required]],
      urgence: ['', [Validators.required]],
      impact: ['', [Validators.required]],
      image: ['', [Validators.required]],
      user_id: ['', [Validators.required]],
      solution: ['', [Validators.required]],
      attribuea: ['', [Validators.required]]
    });

    if (!this.isAddMode) {
      this.TicketService.get(this.ticket_id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }


  Affecter(ticket_id: string) {
    console.log('**********************here')
    this.ticket.statut = 'En cours'
    this.ticket.attribuea = this.form.controls.attribuea.value;
    console.log('test', this.ticket.attribuea)
    this.TicketService.update(ticket_id, this.ticket).subscribe((data) => {

      this.ticket = data

      console.log("user" + this.ticket)

    })
    this.router.navigate([`/ticketadmin`])
  }

}
