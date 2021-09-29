import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ScategorieService } from 'src/app/_service/scategorie.service';
import { StockService } from 'src/app/_service/stock.service';
import { TicketService } from 'src/app/_service/ticket.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';


@Component({
  selector: 'app-resoudreticket',
  templateUrl: './resoudreticket.component.html',
  styleUrls: ['./resoudreticket.component.css']
})
export class ResoudreticketComponent implements OnInit {

  form: FormGroup;
  ticket_id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  ticket: any;
  tickets: any;
  solution: string;
 // scategories = null;
  stocks = null;
  id: string;
  private roles: string[];
  isLoggedIn = false;
  username: string;
  user = null;
  titre: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stockservice :StockService,
    private scategorieservice: ScategorieService,
    private TicketService: TicketService,
    private tokenStorageService: TokenStorageService,

  ) { }

  ngOnInit(): void {
    this.ticket_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.ticket_id;
    this.TicketService.get(this.ticket_id).subscribe((data) => {
      this.ticket = data
    })
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      this.roles = this.user.roles;
      this.username = this.user.username;
      this.id = this.user.id;
      localStorage.setItem('id', this.id);
    }
    this.ticket_id = this.route.snapshot.params['id'];
    this.isAddMode = !this.ticket_id;
    this.TicketService.getAll().subscribe((data) => {
      this.tickets = data
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
      solution: ['', Validators.required],
      attribuea: ['', [Validators.required]]
    });

    if (!this.isAddMode) {
      this.TicketService.get(this.ticket_id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }

  //  this.scategorieservice.getAll().subscribe((data) => {
     // this.scategories = data
   //   console.log("sous_categories" + this.scategories)
   // })

    this.stockservice.getAll().subscribe((data) => {
      this.stocks = data
      console.log("stocks" + this.stocks)
    })
  }

  ResoudreTicket(ticket_id: string) {
    this.ticket.statut = 'Resolu'
    this.ticket.date_echeance = Date.now();
    this.ticket.solution = this.solution;
    this.ticket.solution = this.form.controls.solution.value;
    console.log('test', this.ticket.solution)
    
    this.TicketService.update(ticket_id, this.ticket).subscribe((data) => {
      this.ticket = data
      console.log('id', this.ticket.ticket_id)
    })

    this.TicketService.sendEmail(`http://localhost:4200/api/utilisateur/sendmail/${this.ticket.user_id}`,
      { solution: this.ticket.solution }).subscribe(
        res => {
          console.log(res)
          this.router.navigate([`/ticketadmin`])
        },
        err => {
          console.log(err);
        })


  }

}
