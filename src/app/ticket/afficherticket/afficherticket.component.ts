import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toASCII } from 'punycode';
import { first } from 'rxjs/operators';
import { TicketService } from 'src/app/_service/ticket.service';



@Component({
  selector: 'app-afficherticket',
  templateUrl: './afficherticket.component.html',
  styleUrls: ['./afficherticket.component.css']
})

export class AfficherticketComponent implements OnInit {
  tickets = null;
  ticket = null;
  id: string;
  statut = "En cours";

  constructor(
    private TicketService: TicketService,
    private route: ActivatedRoute,
    private router: Router) { }



  ngOnInit(): void {
    this.TicketService.getAll().subscribe((data) => {
      this.tickets = data

    /*  this.items = [
        {label: 'Update', icon: 'pi pi-refresh', command: () => {
            this.TicketService.update(this.ticket.ticket_id, data);
        }},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
          this.TicketService.delete(this.ticket.ticket_id);
        }},
    ];*/
      //filter(ticket => this.ticket.user_id === localStorage.getItem('id'));
    })

  }
  /*ngOnInit(): void {
    if (this.ticket.user_id = localStorage.getItem('id')){
      this.TicketService.getAll().subscribe((data) => {
        this.tickets = data
        //.filter(status => status.isActive);
      })
    };
  }*/

  updateStatus(status,ticket) {
    const data = {
     status:status
    };

    console.log("***"+this.tickets)
    this.TicketService.update(ticket.ticket_id, data)
      .subscribe(
        response => {
        //  this.users.status = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
        this.ngOnInit();
  }


  deleteTicket(ticket_id: string) {
    console.log("sahar" + ticket_id)
    const ticket = this.tickets.find(x => x.id === ticket_id);
    this.TicketService.delete(ticket_id)
      .pipe(first())
      .subscribe(() => this.tickets = this.tickets.filter(x => x.id !== ticket_id));
    this.ngOnInit();
  }

  ResoudreTicket(ticket_id: string) {

    
  

    document.getElementById("statut").setAttribute(this.ticket.statut, "En cours");
    // status = "En cours";
  }
}


