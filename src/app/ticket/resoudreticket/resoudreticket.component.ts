import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ScategorieService } from 'src/app/_service/scategorie.service';
import { TicketService } from 'src/app/_service/ticket.service';


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
  ticket : any;
  tickets: any;
  solution: string;
  scategories = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private scategorieservice: ScategorieService,
    private TicketService: TicketService,
  ) { }

  ngOnInit(): void {
    this.ticket_id = this.route.snapshot.params['id'];
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
      solution: ['', Validators.required],
      attribuea :['', [Validators.required]]
    });

    if (!this.isAddMode) {
      this.TicketService.get(this.ticket_id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }

    this.scategorieservice.getAll().subscribe((data) => {
      this.scategories = data
      console.log("sous_categories" + this.scategories)
    })
  }

  ResoudreTicket(ticket_id: string) {
    this.ticket.statut = 'Resolu'
    this.ticket.date_echeance = Date.now();
    this.ticket.solution = this.solution;
    this.ticket.solution = this.form.controls.solution.value;
    console.log('test', this.ticket.solution)
    this.TicketService.update(this.ticket_id, this.ticket).subscribe((data) => {
      //this.TicketService.sendEmail(`http://localhost:4200/api/utilisateur/sendmail/${this.ticket.user_id}`, { solution: this.ticket.solution }).subscribe(
        //res => {
          //console.log(res)
          this.router.navigate([`/ticketadmin`])
        //},
        //err => {
         // console.log(err);
        //})
    })

  }

}
