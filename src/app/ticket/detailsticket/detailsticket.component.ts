import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
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
  attribuea: string;
  user:  any = [];
  users = null;
  private roles: string[];
  form: FormGroup;
  id :number;



  constructor(
    private formBuilder: FormBuilder,
    private utilisateurservice: UtilisateurService,
    private TicketService: TicketService,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenStorageService,

  ) { }

  ngOnInit() {
    this.utilisateurservice.get(localStorage.getItem('id')).subscribe((data) => {
      this.user = data
      console.log("userrrr" + this.user)
    })

    this.utilisateurservice.getAll().subscribe((data) => {
      this.users = data
    })
    this.user = this.token.getUser();
    this.roles = this.user.roles;
    this.id = this.user.id;
    this.statut = this.ticket.statut;
    this.ticket_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.ticket_id;
    this.TicketService.get(this.ticket_id).subscribe((data) => {
      this.ticket = data
      console.log("user" + this.user.nom)
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
      attribuea :['', [Validators.required]]
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
  
    this.ticket.attribuea =this.form.controls.attribuea.value;
    console.log('test',  this.ticket.attribuea)

    this.TicketService.update(ticket_id, this.ticket).subscribe((data) => {
     
      this.ticket = data

      console.log("user" + this.ticket)

    })
    this.router.navigate([`/ticketadmin`])
  }

}
